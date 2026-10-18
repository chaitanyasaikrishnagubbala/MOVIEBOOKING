# Backend Run Guide - Movie Ticket Booking System (Spring Boot)

## 1. Project Overview
The backend is a **Spring Boot 3.5.4** RESTful API application running on **Java 17 / 21** and managed with **Maven**. It handles authentication, movies, theaters, screens, shows, seats, seat reservations, bookings, and transaction processing, persisting data into a **MySQL** database with Spring Data JPA and Hibernate. It uses **JWT (JSON Web Tokens)** for stateless authentication and authorization with role-based access control (`ROLE_ADMIN`, `ROLE_USER`).

- **Project Root Directory**: `d:\movieweb\backend\thirdyearex1`
- **Application Port**: `8081`
- **Context Path**: `/`
- **Main Class**: `com.example.thirdyearex1.Thirdyearex1Application`

---

## 2. Prerequisites & Environment Verification
Ensure the following tools are installed and available in your PATH on Windows:

| Dependency | Minimum Version | Verified on System | Verification Command |
|---|---|---|---|
| **JDK (Java)** | JDK 17+ (JDK 21 LTS recommended) | OpenJDK 21.0.10 LTS | `java -version` |
| **Maven** | 3.9+ (or use bundled `mvnw.cmd`) | Apache Maven 3.9.16 | `mvn -v` |
| **MySQL Server** | 8.0+ | MySQL 8.0.45 Community | `mysql --version` |

To verify in PowerShell:
```powershell
java -version
javac -version
mvn -v
Get-Service -Name MySQL*
```

---

## 3. Configuration & Environment Variables
The application configuration is managed via `src/main/resources/application.properties`:

```properties
spring.application.name=thirdyearex1
spring.datasource.url=jdbc:mysql://localhost:3306/movie_booking
spring.datasource.username=<YOUR_MYSQL_USERNAME>
spring.datasource.password=<YOUR_MYSQL_PASSWORD>
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
jwt.secret=<YOUR_SECURE_JWT_SECRET_STRING_256_BIT_OR_LONGER>
jwt.expiration=3600000
server.port=8081
```

> **Security Note**: Never commit actual database passwords or production JWT secrets to version control. When configuring your local environment, replace placeholder values with your local MySQL credentials.

---

## 4. Database Setup
1. **Ensure MySQL Service is Running**:
   ```powershell
   Get-Service -Name MySQL80 | Start-Service
   ```

2. **Create the Database** (if not already created):
   Log in to MySQL CLI or MySQL Workbench:
   ```powershell
   mysql -u root -p
   ```
   Execute the following SQL statement:
   ```sql
   CREATE DATABASE IF NOT EXISTS movie_booking;
   ```

3. **Schema Generation**:
   The application uses `spring.jpa.hibernate.ddl-auto=update`. When you start the Spring Boot app, Hibernate automatically creates and updates all required tables:
   - `users`
   - `movies`
   - `theaters`
   - `screens`
   - `shows`
   - `seats`
   - `bookings`
   - `booking_seats`
   - `transactions`

4. **Default Admin User**:
   On application startup, `AdminInitializer` checks if an admin exists. If not, it automatically seeds:
   - **Email**: `admin@gmail.com`
   - **Password**: `admin123`
   - **Role**: `ROLE_ADMIN`

---

## 5. Build, Run, and Stop Commands

### Step 1: Open the Backend Directory
```powershell
cd d:\movieweb\backend\thirdyearex1
```

### Step 2: Compile and Build
Using system Maven:
```powershell
mvn clean compile
```
Or using the Maven Wrapper:
```powershell
.\mvnw.cmd clean compile
```

### Step 3: Run the Application
Using system Maven:
```powershell
mvn spring-boot:run
```
Or with Maven Wrapper:
```powershell
.\mvnw.cmd spring-boot:run
```

Once started, look for the following confirmation log in the console:
```text
Tomcat started on port 8081 (http) with context path '/'
Started Thirdyearex1Application in X.XXX seconds
```

### Step 4: Stop the Application
- Press `Ctrl + C` in the terminal window where `mvn spring-boot:run` is running.
- Alternatively, find and terminate any process listening on port 8081 in PowerShell:
  ```powershell
  $conn = Get-NetTCPConnection -LocalPort 8081 -ErrorAction SilentlyContinue
  if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }
  ```

---

## 6. API Endpoints & Testing

### Public Endpoints:
- `POST /auth/login` - Authenticate user & retrieve JWT token
- `POST /users` - Register a new customer user

### User & Admin Accessible Endpoints (requires `Authorization: Bearer <token>`):
- `GET /movies` - List all movies
- `GET /movies/{id}` - Get movie details by ID
- `GET /theaters` - List all theaters
- `GET /theaters/{id}` - Get theater details by ID
- `GET /screens` - List all screens
- `GET /screens/{id}` - Get screen details by ID
- `GET /shows` - List all shows
- `GET /shows/{id}` - Get show details by ID
- `GET /shows/movie/{movieId}` - Get shows for a specific movie
- `GET /seats/screen/{screenId}` - Get seats configured for a screen
- `GET /bookings/show/{showId}/seats` - Get list of already booked seat IDs for a show
- `GET /bookings/my-bookings` - Get bookings for the currently authenticated user
- `POST /bookings/book` - Book tickets and generate a transaction
- `PUT /bookings/cancel/{id}` - Cancel a booking

### Admin Only Endpoints (requires `ROLE_ADMIN`):
- `POST /movies`, `PUT /movies/{id}`, `DELETE /movies/{id}`
- `POST /theaters`, `PUT /theaters/{id}`, `DELETE /theaters/{id}`
- `POST /screens`, `PUT /screens/{id}`, `DELETE /screens/{id}`
- `POST /shows`, `PUT /shows/{id}`, `DELETE /shows/{id}`
- `POST /seats`, `PUT /seats/{id}`, `DELETE /seats/{id}`
- `GET /users`, `GET /users/{id}`, `PUT /users/{id}`, `DELETE /users/{id}`
- `GET /bookings` - View all customer bookings
- `GET /transactions` - View all payment transactions

### Example Test Requests (PowerShell)

**1. Login as Admin:**
```powershell
$auth = Invoke-RestMethod -Uri "http://localhost:8081/auth/login" `
  -Method Post `
  -ContentType "application/json" `
  -Body '{"email":"admin@gmail.com","password":"admin123"}'

$token = $auth.token
Write-Host "Admin JWT Token: $token"
```

**2. Fetch All Movies:**
```powershell
Invoke-RestMethod -Uri "http://localhost:8081/movies" `
  -Method Get `
  -Headers @{ Authorization = "Bearer $token" }
```

---

## 7. Common Errors and Solutions

1. **`java.net.ConnectException: Connection refused: no further information`**
   - **Cause**: MySQL server is not running on `localhost:3306`.
   - **Fix**: Run `Start-Service MySQL80` or start MySQL in Services (`services.msc`).

2. **`java.sql.SQLSyntaxErrorException: Unknown database 'movie_booking'`**
   - **Cause**: The database does not exist in MySQL.
   - **Fix**: Connect to MySQL and run `CREATE DATABASE movie_booking;`.

3. **`Access denied for user 'root'@'localhost'`**
   - **Cause**: Incorrect MySQL username or password in `application.properties`.
   - **Fix**: Update `spring.datasource.password` in `src/main/resources/application.properties` to match your local MySQL root password.

4. **`Port 8081 is already in use`**
   - **Cause**: A previous instance of the backend or another program is occupying port 8081.
   - **Fix**: Find and kill the process:
     ```powershell
     Get-NetTCPConnection -LocalPort 8081 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
     ```
