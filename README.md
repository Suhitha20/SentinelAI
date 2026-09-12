# SENTINEL AI

An adaptive disaster intelligence platform for emergency response coordination and disaster management.

## Product Vision

SENTINEL AI evolves into an adaptive disaster intelligence platform that continuously understands what changed, where danger is increasing, who is affected, what should happen first, how responders can reach them safely, and what each disaster teaches for future preparedness.

## Target Audience

- Emergency operations directors
- Field response coordinators
- Recovery planning managers
- Disaster management agencies responsible for coordinating multi-jurisdictional emergency response and resource allocation

## Core Features

- **Disaster Event Management**: Create, read, update, and delete disaster events
- **Real-time Tracking**: Monitor active disasters with severity levels and status updates
- **Location Intelligence**: Track disaster locations with geographic coordinates
- **Impact Assessment**: Record affected populations and disaster details

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLite (SQLAlchemy ORM)
- **Architecture**: Modular Monolith
- **API**: RESTful API with automatic OpenAPI documentation

## Prerequisites

- Python 3.9 or higher
- pip (Python package manager)

## Installation

1. Clone the repository or navigate to the project directory

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
```bash
# On Linux/Mac
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

4. Install dependencies:
```bash
pip install -r backend/requirements.txt
```

5. Create environment configuration:
```bash
cp .env.example .env
```

6. Edit `.env` file and update configuration values as needed (especially `SECRET_KEY` for production)

## Running the Application

### Development Mode

Start the FastAPI development server:

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- API: http://localhost:8000
- Interactive API Documentation (Swagger UI): http://localhost:8000/docs
- Alternative API Documentation (ReDoc): http://localhost:8000/redoc

### Production Mode

For production deployment:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Endpoints

### Health Check
- `GET /` - Root health check
- `GET /health` - Detailed health status

### Disaster Management
- `POST /api/v1/disasters` - Create a new disaster event
- `GET /api/v1/disasters` - List all disasters (supports filtering and pagination)
- `GET /api/v1/disasters/{disaster_id}` - Get specific disaster details
- `PUT /api/v1/disasters/{disaster_id}` - Update disaster information
- `DELETE /api/v1/disasters/{disaster_id}` - Delete a disaster event

### Query Parameters
- `skip`: Number of records to skip (pagination)
- `limit`: Maximum number of records to return
- `status_filter`: Filter by disaster status (active, monitoring, contained, resolved)

## Data Models

### Disaster Types
- Earthquake
- Flood
- Hurricane
- Wildfire
- Tornado
- Tsunami
- Volcanic
- Other

### Severity Levels
- Low
- Moderate
- High
- Critical

### Disaster Status
- Active
- Monitoring
- Contained
- Resolved

## Example API Usage

### Create a Disaster Event

```bash
curl -X POST "http://localhost:8000/api/v1/disasters" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "California Wildfire 2026",
    "disaster_type": "wildfire",
    "severity": "high",
    "location": "Northern California",
    "latitude": 38.5816,
    "longitude": -121.4944,
    "description": "Large wildfire spreading rapidly",
    "affected_population": 50000,
    "occurred_at": "2026-09-12T10:00:00Z"
  }'
```

### List All Active Disasters

```bash
curl "http://localhost:8000/api/v1/disasters?status_filter=active"
```

### Update Disaster Status

```bash
curl -X PUT "http://localhost:8000/api/v1/disasters/1" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "contained",
    "affected_population": 75000
  }'
```

## Project Structure

```
.
├── backend/
│   ├── main.py              # FastAPI application entry point
│   ├── config.py            # Configuration management
│   ├── database.py          # Database connection and session
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── routers/
│   │   └── disasters.py     # Disaster management endpoints
│   └── requirements.txt     # Python dependencies
├── .env.example             # Environment variables template
└── README.md               # This file
```

## Architecture

The application follows a **Modular Monolith** architecture with clear separation of concerns:

- **Routers**: Handle HTTP requests and responses
- **Models**: Define database schema and relationships
- **Schemas**: Validate input/output data using Pydantic
- **Database**: Manage database connections and sessions
- **Config**: Centralize application configuration

## Environment Variables

Key environment variables (see `.env.example` for full list):

- `DATABASE_URL`: Database connection string
- `SECRET_KEY`: Secret key for security features (change in production!)
- `CORS_ORIGINS`: Allowed CORS origins
- `DEBUG`: Enable/disable debug mode

## Security Considerations

- Change `SECRET_KEY` in production
- Use PostgreSQL or MySQL for production instead of SQLite
- Implement authentication and authorization for production use
- Enable HTTPS in production
- Configure appropriate CORS origins
- Implement rate limiting for API endpoints

## Future Enhancements

- User authentication and role-based access control
- Real-time notifications and alerts
- Integration with external weather and geological data sources
- Advanced analytics and reporting
- Mobile application support
- Multi-language support

## License

Proprietary - All rights reserved

## Support

For support and questions, contact your system administrator or emergency operations center.
