import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'

export default function App() {
	const [items, setItems] = useState(() => {
		try {
			const raw = localStorage.getItem('items')
			return raw ? JSON.parse(raw) : []
		} catch (e) {
			return []
		}
	})
	const [editing, setEditing] = useState(null)

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items))
	}, [items])

	function createItem(data) {
		const newItem = { id: Date.now(), ...data }
		setItems(prev => [newItem, ...prev])
	}

	function updateItem(id, updated) {
		setItems(prev => prev.map(it => (it.id === id ? { ...it, ...updated } : it)))
		setEditing(null)
	}

	function deleteItem(id) {
		setItems(prev => prev.filter(it => it.id !== id))
	}

	return (
		<div className="min-h-screen flex flex-col bg-gray-100">
			<Navbar />

			<main className="flex-1 container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto">
					{/* Header Card */}
					<div className="bg-white shadow-lg rounded-2xl p-8 mb-6 border border-gray-200">
						<div className="flex items-center gap-4 mb-2">
							<div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
								<svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
									<line x1="9" y1="9" x2="15" y2="9" />
									<line x1="9" y1="15" x2="15" y2="15" />
								</svg>
							</div>
							<div>
								<h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
									Simple CRUD App
								</h1>
								<p className="text-sm text-gray-600">Create, Read, Update, and Delete items with ease</p>
							</div>
						</div>
					</div>

					{/* Form Section */}
					<div className="mb-6">
						<ItemForm
							key={editing ? editing.id : 'new'}
							onCreate={createItem}
							onUpdate={updateItem}
							editing={editing}
							cancelEdit={() => setEditing(null)}
						/>
					</div>

					{/* List Section */}
					<div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
						<ItemList
							items={items}
							onEdit={item => setEditing(item)}
							onDelete={deleteItem}
						/>
					</div>
				</div>
			</main>

			<Footer />
		</div>
	)
}