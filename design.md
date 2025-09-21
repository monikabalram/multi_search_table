Design and Implementation Choices

Overall Design and Layout
The application follows a two-column, responsive layout. The left column (aside) acts as a control panel, containing all the interactive components for searching, selecting tables, and filtering. The right column (main) is dedicated to displaying the search results. This separation ensures that the user's input controls are always accessible, providing a clear and intuitive user experience.

Responsive Layout: The design adapts gracefully to different screen sizes. On larger screens (lg breakpoint and above), the layout is horizontal with two distinct columns. On smaller screens, the columns stack vertically, maintaining usability on mobile devices.

Consistent Height: The use of Flexbox and h-full on the main container and its children ensures that the aside and main columns stretch to the same height. This prevents a fragmented appearance and provides a cleaner, more professional visual flow.

Tailwind CSS: I chose Tailwind CSS for its utility-first approach. It allowed for rapid styling and customization without writing custom CSS, which contributes to a more maintainable and consistent codebase. The use of classes like shadow-md, rounded-lg, and color utilities provides a modern, polished look.

Component Structure
The application's logic is broken down into several reusable React components, promoting a clear and maintainable code structure.

App.jsx: The main component that manages the application's state, including data, search terms, and filters. It orchestrates the flow of data between the other components.

SearchBox: A simple, controlled input component for the main search bar.

TableSelection: Manages the display and selection of available tables. It also handles the dynamic addition and removal of uploaded tables.

AdvancedFilters: A collapsible section that dynamically renders filter controls based on the selected tables and their configurations. This design choice prevents cluttering the UI when not in use.

CSVUpload: A component with a drag-and-drop area for uploading new data. This is a key feature that goes beyond the basic requirements, allowing the app to be truly dynamic.

ResultsDisplay: Responsible for rendering the filtered data in a clean, tabular format. It provides a clear visual representation of the search results.

Implemented Features Beyond the Requirements
In addition to the core requirements, I implemented several enhancements to improve the user experience and functionality:

Dynamic Filter Generation: The advanced filters are not hard-coded for the dummy data. Instead, they are defined in a tableConfigs object, allowing the application to dynamically render the correct filter types (select or range) for any given table.

CSV Upload Functionality: The ability to upload new CSV files and search through them works as intended. However, the advanced filtering feature on the uploaded data is still a work in progress. If given more time, I would focus on fixing this to ensure all features function with dynamically uploaded content.

State Management: I used React's useState and useMemo hooks for efficient state management. useMemo is particularly important for the filteredResults variable, as it prevents unnecessary re-calculations on every render, ensuring a smooth and responsive user experience.

Clear All Functionality: A "Clear All" button was added to the table selection component, providing a quick way for users to reset their table selections and search filters.

Loading and Error States: The application includes a LoadingSpinner and ErrorDisplay to provide feedback to the user during asynchronous operations or in case of data loading failures.