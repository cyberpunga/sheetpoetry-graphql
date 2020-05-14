# sheetpoetry-graphql

This is a GraphQL API to generate _poems_ from randomly selected cells on a Google spreadsheet. Try it live [here](https://sheetpoetry.now.sh).

## Usage

The API takes a query called `sheetpoem` with 3 arguments:

- `spreadsheetId` (String): The spreadsheet's ID.
- `range` (String): The range of cells.
- `verses` (Int): The number of verses.

## Example

Just copy the sample query shown below (for this example we are using [this spreadsheet](https://docs.google.com/spreadsheets/d/1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU) with "1000 chilean verses" selected by Felipe Cussen and Marcela Labraña).

```graphql
{
  sheetpoem(
    spreadsheetId:"1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
    range:"A1:B50"
    verses: 4
  )
}
```

And you'll get something like this:

```graphql
{
  "data": {
    "sheetpoem": "del triunfo marcial por ciudad extraña\nYo les voy a contar lo que nadie ha visto no acepto a ningún inepto\nChile limita al centro de la injusticia A recorrer me dediqué este día\nSe chileniza y se idiotiza tictaquea en la oficina del jefe-estación"
  }
}
```

If you want to use *private* spreadsheets, remember to share them with the API's client email first: ***sheetpoetry@sheetpoetry.iam.gserviceaccount.com***.
