## Idea
Daily Report is a feature which allows a construction manager to report his/her observations after the visit to construction site on a daily basis. 
You can find actual designs [here](https://github.com/capmo/frontend-test/tree/master/designs).

The page consists from the header (contains meta info about daily report like reporter name, address, date etc.), status bar, and actual data sections which are:
- Visits (stands for coming and leaving time of a reporter)
- Weather 
- Attendances (stands for companies which were present on the construction side)
- Special occurances (all releavent notes)
- Images

Each section receives the paginated list of data from graphql endpoint. There are also 3 more endpoints available: for adding item to the list, updating item and deleting item. 

Data is autosaved. When data is saved the text in status bar gets updated and shows the last save date and time.

Each section has "Add button": when pressed a new empty field should appear in UI, but no item create event should be triggered (we don't want to fill database with empty values). After the field has a valid input then the create event should be send to the backend.

You can check how the actual feature works [here](https://app.staging.capmo.de/projects/a5b60f3a-8e94-11ea-be39-b300a4e40f96/new-daily-reports/2020-11-08).

Test login data:
email: test1a@capmo.de
password: 123456qwerty

