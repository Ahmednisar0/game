'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { FiRefreshCw, FiTrash2, FiLogOut, FiChevronDown, FiChevronUp, FiDollarSign, FiPackage, FiShoppingBag, FiCalendar, FiMapPin } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

type Product = {
  id: string
  name: string
  price: number
  quantity: number
  category: string
}

type Order = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  apartment?: string
  city: string
  state: string
  zipCode: string
  country: string
  products: Product[] | null
  _createdAt: string
}

export default function PremiumDashboard() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  // Check auth
  useEffect(() => {
    if (!localStorage.getItem('authToken')) {
      router.push('/login')
    }
  }, [])

  const fetchOrders = async () => {
    try {
      const result = await client.fetch(`*[_type == "order"] | order(_createdAt desc) {
        _id, firstName, lastName, email, phone, address, apartment, city, 
        state, zipCode, country, products, _createdAt
      }`)
      setOrders(result)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchOrders() }, [])

  const deleteOrder = async (id: string) => {
    if (!confirm('Delete this order permanently?')) return
    await client.delete(id)
    setOrders(orders.filter(order => order._id !== id))
  }

  const toggleExpand = (id: string) => {
    setExpandedOrder(expandedOrder === id ? null : id)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateTotal = (products: Product[] | null) => {
    return products?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-white rounded-lg shadow-sm" />
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800 ">Orders Dashboard</h1>
          <div className="flex space-x-3">
            <button 
              onClick={fetchOrders}
              className="flex items-center px-4 py-2  bg-white border border-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              <FiRefreshCw className="mr-2 text-black" />
              Refresh
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('authToken')
                router.push('/login')
              }}
              className="flex items-center  px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
            >
              <FiLogOut className="mr-2 text-black" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <StatCard 
            icon={<FiShoppingBag className="text-blue-500" />}
            title="Total Orders"
            value={orders.length}
            trend="up"
          />
          <StatCard 
            icon={<FiDollarSign className="text-green-500" />}
            title="Total Revenue"
            value={`$${orders.reduce((sum, order) => sum + calculateTotal(order.products), 0).toFixed(2)}`}
          />
          <StatCard 
            icon={<FiPackage className="text-purple-500" />}
            title="Total Items"
            value={orders.reduce((sum, order) => sum + (order.products?.reduce((pSum, p) => pSum + p.quantity, 0) || 0), 0)}
          />
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">Recent Orders</h2>
          </div>

          {orders.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No orders found</div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {orders.map((order) => (
                <li key={order._id}>
                  <div 
                    className="px-6 py-4 text-black hover:bg-gray-50 cursor-pointer"
                    onClick={() => toggleExpand(order._id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-50 text-blue-600 rounded-lg p-2">
                          <FiShoppingBag />
                        </div>
                        <div>
                          <p className="font-medium text-black">
                            {order.firstName} {order.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium text-black">${calculateTotal(order.products).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">
                            {order.products?.length || 0} items
                          </p>
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteOrder(order._id)
                          }}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <FiTrash2 />
                        </button>
                        
                        {expandedOrder === order._id ? (
                          <FiChevronUp className="text-gray-400" />
                        ) : (
                          <FiChevronDown className="text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-gray-50 border-t text-black border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Customer Info */}
                          <div>
                            <h3 className="text-sm font-medium text-black  mb-3">CUSTOMER</h3>
                            <div className="space-y-2">
                              <p className="text-sm text-black">
                                <span className="font-medium text-black">Name:</span> {order.firstName} {order.lastName}
                              </p>
                              <p className="text-sm">
                                <span className="font-medium text-black">Email:</span> {order.email}
                              </p>
                              <p className="text-sm text-black">
                                <span className="font-medium text-black">Phone:</span> {order.phone}
                              </p>
                            </div>
                          </div>

                          {/* Shipping Info */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-3">SHIPPING</h3>
                            <div className="space-y-2">
                              <p className="text-sm flex items-start">
                                <FiMapPin className="mr-2 mt-0.5 flex-shrink-0 text-black" />
                                {order.address}{order.apartment && `, ${order.apartment}`}, {order.city}, {order.state} {order.zipCode}, {order.country}
                              </p>
                              <p className="text-sm flex items-center text-black">
                                <FiCalendar className="mr-2" />
                                Ordered on {formatDate(order._createdAt)}
                              </p>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="md:col-span-2">
                            <h3 className="text-sm font-medium text-gray-500 mb-3">ITEMS</h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Product</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Price</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Qty</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">Total</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 text-black">
                                  {order.products?.map((product, i) => (
                                    <tr key={i}>
                                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.name}</td>
                                      <td className="px-4 py-3 text-sm text-gray-500">${product.price.toFixed(2)}</td>
                                      <td className="px-4 py-3 text-sm text-gray-500">{product.quantity}</td>
                                      <td className="px-4 py-3 text-sm text-gray-500">${(product.price * product.quantity).toFixed(2)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode, title: string, value: string | number, trend?: 'up' | 'down' }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold mt-1">{value}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  )
}