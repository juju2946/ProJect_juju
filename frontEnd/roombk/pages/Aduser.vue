<script setup lang="ts">
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'
import { useRouter } from 'vue-router' // Import router

// ปรับปรุง interface User ให้ตรงกับข้อมูลจาก API
interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    role: string
    status: 'Active' | 'Inactive'
    createdAt: string
    updatedAt: string
    password?: string // เพิ่ม optional password ถ้าไม่ต้องการแสดง
}

const router = useRouter()
const toast = useToast()
const UBadge = resolveComponent('UBadge')
const searchQuery = ref('')

// ดึงข้อมูลจาก API และจัดการกรณีที่ data1 เป็น null
const { data: data1, error, refresh } = await useFetch<User[]>('http://localhost:3001/users')

// กรองข้อมูลตาม searchQuery โดยใช้ firstName และ lastName
const filteredData = computed(() => {
    if (!data1.value) return []
    if (!searchQuery.value) return data1.value
    return data1.value.filter(user =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const columns: TableColumn<User>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'firstName', header: 'First Name' }, // แสดง First Name
    { accessorKey: 'lastName', header: 'Last Name' },   // เพิ่ม Last Name
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleDateString()
    },
    {
        accessorKey: 'updatedAt',
        header: 'Updated At',
        cell: ({ row }) => new Date(row.getValue('updatedAt')).toLocaleDateString()
    },
    { id: 'action', header: '' } // คอลัมน์ Action สำหรับจุด 3 จุด
]

function getDropdownActions(user: User): DropdownMenuItem[][] {
    return [
        [
            {
                label: 'Copy user Id',
                icon: 'i-lucide-copy',
                onSelect: () => {
                    navigator.clipboard.writeText(user.id.toString())
                    toast.add({ title: 'User ID copied to clipboard!', color: 'success', icon: 'i-lucide-circle-check' })
                }
            }
        ],
        [
            {
                label: 'Edit',
                icon: 'i-lucide-edit',
                onSelect: () => {
                    router.push(`/edit-user/${user.id}`) // นำทางไปหน้าแก้ไข
                }
            },
            {
                label: 'Delete',
                icon: 'i-lucide-trash',
                color: 'error',
                onSelect: async () => {
                    if (confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
                        try {
                            await $fetch(`http://localhost:3001/users/${user.id}`, {
                                method: 'DELETE'
                            })
                            await refresh()
                            toast.add({ title: 'User deleted successfully!', color: 'success', icon: 'i-lucide-circle-check' })
                        } catch (error) {
                            console.error('Error deleting user:', error)
                            toast.add({ title: 'Failed to delete user', color: 'error', icon: 'i-lucide-alert-triangle' })
                        }
                    }
                }
            }
        ]
    ]
}
</script>

<template>
    <header class="bg-gray-100 p-4 rounded-t-lg shadow-md">
        <h2 class="text-2xl font-bold text-gray-800">All Users</h2>
    </header>
    <div class="bg-white shadow-md rounded-b-lg">
        <div class="p-4 flex justify-between items-center border-b border-gray-200">
            <div class="flex items-center gap-3 w-full max-w-md">
                <UInput v-model="searchQuery" placeholder="Search..." icon="i-lucide-search" size="sm"
                    class="w-full border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200" />
            </div>
            <NuxtLink to="/AdNewuser">
                <UButton label="Add New User" icon="i-lucide-plus" color="primary"
                    class="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-200 ml-4" />
            </NuxtLink>
        </div>

        <!-- แสดงข้อความถ้ามีข้อผิดพลาดหรือไม่มีข้อมูล -->
        <div v-if="error" class="p-4 text-red-500">
            Failed to load users: {{ error.message }}
        </div>
        <div v-else-if="!data1 || data1.length === 0" class="p-4 text-gray-500">
            No users found.
        </div>
        <UTable v-else :data="filteredData" :columns="columns" class="flex-1 mt-0 p-4">
            <template #name-cell="{ row }">
                <div class="flex items-center gap-3">
                    <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id || 1}`" size="lg"
                        :alt="`${row.original.firstName} ${row.original.lastName} avatar`"
                        @error="console.log('Image failed to load for ID:', row.original.id)" />
                    <div>
                        <p class="font-medium text-gray-800">{{ row.original.firstName }}</p>
                    </div>
                </div>
            </template>
            <template #action-cell="{ row }">
                <UDropdownMenu :items="getDropdownActions(row.original)">
                    <UButton icon="i-lucide-ellipsis-vertical" color="neutral" variant="ghost" aria-label="Actions" />
                </UDropdownMenu>
            </template>
        </UTable>
    </div>
</template>