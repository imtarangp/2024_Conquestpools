# Conquest pools

## Prerequisites

Ensure you have the following installed on your machine:

- **.NET 8 SDK**  
- **NodeJS**

---

## Migration Details

This project backend was recently migrated from **.NET 5** to **.NET 8**.  
The migration involved the following updates:

1. Updated all project dependencies in class libraries to be compatible with .NET 8.  
2. Changed the target SDK in the project files to `.NET 8`.  
3. Replaced `Startup.cs` with `Program.cs` for WebAPI as per .NET 8 conventions.  
4. Updated swagger configuration for easy API documentation

### Frontend Migration:  

The following dependencies were updated as part of the migration process:

| **No.** | **Package**                     | **Old Version** | **New Version** |
|---------|---------------------------------|-----------------|-----------------|
| 1       | hookform/resolvers             | 2.9.7           | 3.9.1           |
| 2       | testing-library/jest-dom       | 5.16.5          | 6.6.3           |
| 3       | testing-library/react          | 13.3.0          | 16.0.1          |
| 4       | testing-library/user-event     | 13.5.0          | 14.5.2          |
| 5       | axios                          | 0.27.2          | 1.7.8           |
| 6       | bootstrap                      | 5.2.0           | 5.3.3           |
| 7       | dotenv                         | 8.2.0           | 16.4.6          |
| 8       | highcharts                     | 10.3.2          | 12.0.1          |
| 9       | highcharts-react-official      | 3.1.0           | 3.2.1           |
| 10      | konva                          | 8.3.14          | 9.3.16          |
| 11      | moment                         | 2.29.4          | 2.30.1          |
| 12      | react                          | 18.2.0          | 18.3.1          |
| 13      | react-dom                      | 18.2.0          | 18.3.1          |
| 14      | react-hook-form                | 7.43.5          | 7.53.2          |
| 15      | react-icons                    | 4.4.0           | 5.3.0           |
| 16      | react-idle-timer               | 5.4.2           | 5.7.2           |
| 17      | react-select                   | 5.4.0           | 5.8.3           |
| 18      | sweetalert2                    | 11.6.6          | 11.14.5         |
| 19      | yup                            | 0.32.11         | 1.4.0           |
| 20      | web-vitals                     | 2.1.4           | 4.2.4           |
| 21      | react-to-print                 | 2.14.12         | 2.14.12         |
| 22      | react-redux                    | 8.0.5           | 9.1.2           |
| 23      | react-router-dom               | 6.9.0           | 7.0.2           |
| 24      | redux                          | 4.2.1           | 5.0.1           |
| 25      | redux-thunk                    | 2.4.2           | 3.1.0           |
| 26      | react-query                    | 3.39.2          | 3.39.3          |



## Installation Instructions

Follow these steps to get the project up and running:

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <project-folder>
2. Install node packages for Frontend
	```bash
	npm install


## How to use Backend project:

To use dotnet 8 api, you need to inject dependencies into `program.cs` file.

change connection string into the `application.json` file.

I have moved the publish profiles to other location so while publishing you'll now have option to publish it in file.


