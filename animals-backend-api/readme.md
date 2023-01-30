# Animals Backend API
To-do:

Week 1
[x] Endpoint stubs
Week 2
[ ] Implement endpoint validation logic
[ ] Automatic endpoint testing using OpenAPI spec and thunder client?
Week 3
[ ] Implement initial MySQL backend
[ ] Implement initial MDB backend


## User roles
Member - Create sighting, view trails, animals, sightings.
Contributor - CRUD on animals 
Admin - all access


## Pages
- Homepage (List recent sightings, login form)
- Trails admin (list with upload button)
- Animal admin (list with edit, delete buttons)
    - Create/edit animal
- User admin (list with edit, delete buttons)
- Sightings list (filter options. shows delete for admin users)
    - Create sighting
- User sign up (new users are members)
- User dashboard (shows sightings, edit self, logout)


## Controllers

*Trails*
- List trails
- Upload trails XML files
- Delete trail by ID

*Sightings*
- Create a sighting (link; trail, animal, user. include; date and time, comment)
- List sightings (By trail, by animal, by user)
- Delete

*Animals*
- List animals
- View animal
- Create animal
- Edit animal
- Delete animal

*Users*
- Login
- Logout
- List
- View
- Create
- Edit
- Delete