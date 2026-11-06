# Final-Poe-MAST-
Name-Tshifhiwa Muadu
Student Number-ST10521460

Christoffel's Restaurant Menu Manager
Final Portfolio of Evidence (Final POE)
This project is the enhanced version of the React Native application developed in Part 2. Part 1 and Part 2 have not been recreated. The existing application structure, restaurant identity, colour scheme and starter menu data have been retained and extended.
Final POE features
1. Manage menu items
- Add a new dish with its name, description, course, price and an optional image URL.
- Display real food photographs for the sample dishes.
- Preview a pasted dish image URL in the add/edit form.
- Open a dish to view its details.
- Edit an existing dish and save the updated information.
- Delete a dish after confirming the action.
- Updates are reflected immediately in the menu and statistics.
2. Search and filter menu items
- Search menu items by dish name.
- Filter menu items by Starter, Main Course, Dessert or Beverage.
- Combine a name search with a course filter.
- Clear the search and filter to display all menu items again.
- A helpful empty-results message is displayed when nothing matches.
3. Display menu statistics
The menu overview displays:
- Total number of menu items.
- Average price of all menu items.
- Number of Starters.
- Number of Main Courses.
- Number of Desserts.
- Number of Beverages.
Statistics are calculated from the current menu data and update after adding, editing or deleting a dish. When the menu is empty, the average price is safely displayed as R0.00.
4. Application and code improvements
- Retained the maroon, gold and cream visual theme from Part 2.
- Added reusable Header, PrimaryButton, CourseSelector and StatCard components.
- Used reusable helper functions for price and course labels.
- Used useMemo for derived menu results and statistics.
- Improved spacing, headings, search controls, statistic cards and empty states.
- Added accessibility labels and button roles to key controls.
- Added duplicate dish-name validation (case-insensitive).
- Added input length limits and improved price validation.
- Kept styles together in App.tsx, as in the Part 2 project structure.
Change log: Part 2 to Final POE
Area	Change made
Dish photographs	Added real food photographs for Bobotie, Malva Pudding, Butternut Soup, Grilled Kingklip and Koeksisters.
Custom dish images	Added an optional HTTPS image URL field with a preview when adding or editing a dish.
Search	Added a search input that matches dish names without case sensitivity.
Filtering	Added course filters for Starters, Main Courses, Desserts and Beverages.
Clear controls	Added a Clear all action and a Show all menu items action for empty results.
Statistics	Added total items, average price and per-course counts.
Live updates	Statistics and displayed menu items recalculate when menu data changes.
Add dish	Kept the Part 2 add feature and improved validation and feedback.
Edit dish	Kept the Part 2 edit feature and ensured updated details are reflected immediately.
Delete dish	Kept the Part 2 delete feature with a confirmation prompt and success message.
Reusable components	Extracted shared header, button, course selector and statistic card components.
Code organisation	Grouped types, theme values, data, helpers, reusable components, app logic and styles.
User experience	Improved menu overview, search/filter layout, empty-state feedback and form guidance.


Main files
- App.tsx — application screens, menu data, functionality and styles.
- README.md — project overview and Final POE change log.
How to run
1. Open the existing React Native project in Visual Studio Code.
2. Replace the existing App.tsx with the Final POE App.tsx supplied with this submission.
3. Keep the project's existing React Native / Expo setup and dependencies.
4. Run the project using the command already used by your Part 2 project (for an Expo project, this is commonly npx expo start).
5. Test adding, editing, deleting, searching, filtering and the statistics.
Testing checklist for the demonstration
- [ ] Open the application and show the menu.
- [ ] Add a new dish with a name, description, course and valid price.
- [ ] Open that dish and edit its information.
- [ ] Delete a dish and demonstrate the confirmation prompt.
- [ ] Search for a dish by name.
- [ ] Filter the menu by each course.
- [ ] Clear the search and filter and show all dishes.
- [ ] Show the total number of items, average price and course counts.
- [ ] Add, edit or delete a dish and show that the statistics update.

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/a6422bcf-2b8a-454c-83ef-10ca9602804e" />
Adding menu items
Searching for menu items

<img width="1918" height="1075" alt="image" src="https://github.com/user-attachments/assets/2d3af870-f6e5-4e24-8d10-5d4f677ed3ed" />
Displaying menu statistics

<img width="1918" height="1076" alt="image" src="https://github.com/user-attachments/assets/38e42427-199e-4ac2-993e-ee003bed8705" />
Editing menu items
Deleting menu items

<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/8c1e441b-5dd0-4c5a-9b95-c49d3a3eac43" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/205bf955-58da-4ec5-8fbc-bd6930dbfde3" />
<img width="1918" height="1078" alt="image" src="https://github.com/user-attachments/assets/3407ae58-8cd0-47e8-9886-497b00e42d41" />
The overal functionality of the complete application


Referrence

Microsoft. 2026. GitHub Copilot Chat in Visual Studio Code. Available at: https://code.visualstudio.com/docs/copilot/chat [Accessed: 6 November 2026]
Gemma Helyer, 2023. Learn Figma in under 5 minutes. [video online] Available at:
<https://www.youtube.com/watch?v=7TF2ZmtkZz0> [Accessed 06 November 2026].
Bobotie: https://www.gutekueche.ch/bobotie-rezept-19978 [Accessed 06 November 2026]
Malva pudding: https://iol.co.za/lifestyle/food-drink/2026-09-17-heritage-month-iconic-south-african-dishes-that-tell-the-story-of-south-africa/ [Accessed 06 November 2026]
Butternut soup: https://itsonly.recipes/view/timeless-roasted-butternut-squash-soup [Accessed 06 November 2026]
Grilled kingklip: https://salmonroyale.com/Kingklip-200g-p377251601 [Accessed 06 November 2026]
Koeksisters: https://drizzleanddip.com/2021/09/24/classic-south-african-koeksisters/
