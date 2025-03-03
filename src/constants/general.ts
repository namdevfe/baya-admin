export const ROLE_SORT_OPTIONS = [
  {
    value: 'createdAt',
    label: 'Newest',
    queryObject: { sort: 'desc', sortBy: 'createdAt' }
  },
  {
    value: 'updatedAt',
    label: 'Updated Newest',
    queryObject: { sort: 'asc', sortBy: 'updatedAt' }
  },
  {
    value: 'name',
    label: 'Name',
    queryObject: { sort: 'asc', sortBy: 'name' }
  }
]
