# Task-Kin Overview 
This is CICCC's group project, functional task management application for family. Users can manage todos, assign members, create invitations and groups, etc.

Basic functionalities have already been implemented, and this app can be running on localhost. However, the following bug fixes and upcoming feature additions are required. Deployment of the project is also planned.

## General
 - Add Google Authentication
 - Deployment
 - Add MUI Snack bar (Sign-in, Sign-up, Add/Delete/Update Todo, Accept/Decline Invitation, Create Group, etc.)
 - Reload when user adds a todo, etc.
 - AI Chat (Optional)
## Design
 - Dark Mode CSS Adjustment
 - Add design elements for initial users (users who have just signed up and have not joined any group yet)
 - ('/') Conditional elements page: "You have not yet joined any group. Please create or join [settings link] first."
 - ('/todolist') Conditional elements page: "To create a todo, please create or join a group [settings link] first."
 - ('/calendar') Conditional elements page: "To create a todo, please create or join a group [settings link] first."
 - ('/shopping') Conditional elements page: "To create a todo, please create or join a group [settings link] first."
 - ('/settings') Conditional elements for Invitations and Groups: "You have not yet joined any group. Please create or join [settings link]."
 - Responsiveness for all pages
## Programming
### '/'
 - None (Optional)
### '/todolist'
 - Add "Assigned User’s Name” to Avatar (First Letter)
 - Add “Complete” button
 - Enhance Update Task
 - Add a new field "assigned user's name" to each task
 - Todo List & Speed Dial: Add checkboxes in each task. Add multiple delete/complete button in Speed dial
### '/calendar'
 - None (Optional)
### '/settings'
 - (State) When a user creates a group, parse the state to Redux in order to see the current group name on '/' right after this process. (*With the current code, users can see the group name after logout-login)
 - Fix Dark Mode toggle
 - Prevent users from sending invitations more than once to one user
 - Leave the group function
 - Display all members in the same group
### '/shopping'
 - Create a Shopping page. Navigation, all functionalities
 - Notify by email when inviting a user
### Components
 - Header: Task badge → should show the number of your tasks (not all tasks in the group)
Etc.
