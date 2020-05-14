# sheetpoetry-graphql

Esta es una API GraphQL para generar _poemas_ desde celdas seleccionadas al azar en una hoja de cálculo de Google. Pruébala en vivo [aquí](https://sheetpoetry.now.sh).

## Uso

La API acepta una consulta llamada `sheetpoem` con 3 argumentos:

- `spreadsheetId` (String): El ID de la hoja de cálculo a utilizar.
- `range` (String): El rango de celdas a utilizar.
- `verses` (Int): La cantidad de versos del poema.

## Ejemplo

Copia y pega la consulta de ejemplo que se muestra acontinuación (para este ejemplo usaremos [esta hoja de cálculo](https://docs.google.com/spreadsheets/d/1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU) con "1000 versos chilenos" seleccionados por Felipe Cussen y Marcela Labraña):

```graphql
{
  sheetpoem(
    spreadsheetId:"1qjgDw3TREpqQoSSbB0tzd0Joues1jraJix2mU52zToU"
    range:"A1:B50"
    verses: 4
  )
}
```

Y obtendrás una respuesta como la siguiente:

```graphql
{
  "data": {
    "sheetpoem": "del triunfo marcial por ciudad extraña\nYo les voy a contar lo que nadie ha visto no acepto a ningún inepto\nChile limita al centro de la injusticia A recorrer me dediqué este día\nSe chileniza y se idiotiza tictaquea en la oficina del jefe-estación"
  }
}
```

Si quieres usar hojas de cálculo *privadas*, recuerda compartirlas primero con el email de cliente de la API: ***sheetpoetry@sheetpoetry.iam.gserviceaccount.com***.
