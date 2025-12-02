# Events Data

## How to Add Events

**Edit `src/data/events.json`** to add new events.

Simply add new event objects to the `events` array. Each event will automatically:
- Show up on the Events page
- Have a Register button
- Use the same registration page template
- Follow the same format

## Event Format

```json
{
  "id": "unique-id",
  "name": "Event Name",
  "date": "October 4",
  "formattedDate": "Saturday, October 4",
  "deadline": "September 14",
  "description": "Short description shown in event card/list",
  "registrationDescription": "Optional: Longer description shown on registration page (if not provided, uses description)",
  "status": "open",
  "location": "City, State",
  "type": "DOC",
  "registrationInfo": {
    "behindTheWalls": {
      "date": "Saturday, October 4",
      "time": "6:30AM-3:00PM",
      "note": "(times subject to change)"
    },
    "registrationDeadline": "Wednesday, September 17",
    "equipIgniteTraining": {
      "instruction": "Please arrive 15 minutes early to check-in",
      "date": "Friday, October 3, 5:30 PM",
      "location": "Church Name",
      "address": "123 Street",
      "city": "City, State, ZIP"
    },
    "registrationFee": "$25.00",
    "showRegisterButton": true,
    "importantInformation": "Optional: Important information to display on registration page",
    "contactInformation": {
      "eventAdministrator": "Optional: Name of event administrator",
      "phone": "Optional: Contact phone number",
      "eventDirector": "Optional: Name of event director"
    },
    "travelInformation": "Optional: Travel and parking information"
  }
}
```

## Notes

- Events are bundled with the app (no API needed)
- After editing, rebuild the app to see changes
- All events get Register buttons automatically (unless `showRegisterButton` is set to `false`)
- Registration pages use the same template format
- Set `showRegisterButton: false` in `registrationInfo` to hide the "Register for Event!" button for specific events

