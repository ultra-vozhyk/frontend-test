# Idea
Daily Report is a feature which allows a construction manager to report his/her observations after the visit to construction site on a daily basis. 
You can find actual designs [here](https://github.com/capmo/frontend-test/tree/master/designs).

The page consists from the header (contains meta info about daily report like reporter name, address, date etc.), status bar, and actual data sections which are:
- Visits (stands for coming and leaving time of a reporter)
- Weather 
- Attendances (stands for companies which were present on the construction side)
- Special occurances (all releavent notes)
- Images

## API
Each section receives the paginated list of data from graphql endpoint. The shape of the response is always the same only the shape of list item is different. There are also 3 more endpoints available: for adding item to the list, updating item and deleting item. 

## Save behaviour
Data is autosaved. After data is saved the text in status bar gets updated and shows the last save date and time.

## Section UX
Each section has "Add button": when pressed a new empty field should appear in UI, but no _item create event_ should be triggered (we don't want to fill database with empty values). After field has a valid input only then _create event_ should be send to the backend.
The section should display not more than 5 items at the start. If more is available then "Read more" button should be displayed. After pressed, the next 5 items are added to the list.

## Task
Outline the solution and build special occurances section.

## Example
You can check how the actual feature works [here](https://app.staging.capmo.de/projects/a5b60f3a-8e94-11ea-be39-b300a4e40f96/new-daily-reports/2020-11-08).

Test login data:
email: test1a@capmo.de
password: 123456qwerty

