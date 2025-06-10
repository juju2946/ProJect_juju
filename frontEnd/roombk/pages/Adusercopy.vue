<script setup lang="ts">
import { Body } from '#components'
import type { TableColumn, DropdownMenuItem } from '@nuxt/ui'

interface User {
    id: number
    name: string
    email: string
    role: string
    status: 'Active' | 'Inactive'
}

const toast = useToast()
const UBadge = resolveComponent('UBadge')
const searchQuery = ref('')

// ดึงข้อมูลจาก API และจัดการกรณีที่ data1 เป็น null
const { data: data1, error } = await useFetch<User[]>('http://localhost:3001/users')

// กรองข้อมูลตาม searchQuery
const filteredData = computed(() => {
    if (!data1.value) return []
    if (!searchQuery.value) return data1.value
    return data1.value.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const columns: TableColumn<User>[] = [
    { accessorKey: 'id', header: 'ID' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'role', header: 'Role' },
    // {
    //     accessorKey: 'status',
    //     header: 'Status',
    //     cell: ({ row }) => {
    //         const color = {
    //             Active: 'success' as const,
    //             Inactive: 'error' as const,
    //         }[row.getValue('status') as string]
    //         return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
    //             row.getValue('status')
    //         )
    //     }
    // },
    // { id: 'action' }
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
            { label: 'Edit', icon: 'i-lucide-edit' },
            { label: 'Delete', icon: 'i-lucide-trash', color: 'error' }
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
                    <UAvatar :src="`https://i.pravatar.cc/120?img=${row.original.id}`" size="lg"
                        :alt="`${row.original.name} avatar`" />
                    <div>
                        <p class="font-medium text-highlighted">{{ row.original.firstName }}</p>
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