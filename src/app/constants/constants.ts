export const DEFAULT_AVATAR_URL = 'https://dummyimage.com/150x200/cccccc/000000.png&text=Book+Cover'
export const MAX_WIDTH_POPUP_DESKTOP = '450px'
export const HINT_SHOW_DELAY = 500

export const BOOK_FORM_FIELDS = [
  { name: 'avatar_url', label: 'Avatar URL', placeholder: 'Enter the URL for the book avatar', error: 'Wrong URL' },
  { name: 'title', label: 'Title *', placeholder: 'Enter book title', error: 'Wrong book title' },
  { name: 'author', label: 'Author *', placeholder: 'Enter book author name', error: 'Wrong name' },
  { name: 'createdDate', label: 'Date of Publication *', placeholder: 'Enter book publication date', error: 'Wrong date' },
  { name: 'description', label: 'Description *', placeholder: 'Add description', error: 'Wrong description' },
]

export const MAX_DATE = new Date();
