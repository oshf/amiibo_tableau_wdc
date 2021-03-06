(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [ 
          {
              id: "head",
              alias: "Head",
              dataType: tableau.dataTypeEnum.string
          },
          {
              id: "tail",
              alias: "Tail",
              dataType: tableau.dataTypeEnum.string
          },
          {
            id: "amiiboSeries",
            alias: "Amiibo Series",
            dataType: tableau.dataTypeEnum.string
         },
          {
            id: "character",
            alias: "Character",
            dataType: tableau.dataTypeEnum.string
         },
         {
            id: "gameSeries",
            alias: "Game Series",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "name",
            alias: "Amiibo Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "release_na",
            alias: "NA Release Date",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "release_eu",
            alias: "EU Release Date",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "release_au",
            alias: "AU Release Date",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "release_jp",
            alias: "JP Release Date",
            dataType: tableau.dataTypeEnum.date
        },
        {
            id: "image",
            alias: "Image",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "type",
            alias: "Type",
            dataType: tableau.dataTypeEnum.string
        }
      ];

        var tableSchema = { // Create tableSchema obj
            id: "amiiboapi",
            alias: "Amiibo API",
            columns: cols
        };

        schemaCallback([tableSchema]); // Callback function to report the table 
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) { 
        $.getJSON("https://www.amiiboapi.com/api/amiibo/", function(resp) { //GET HTTP request to load data from Amiibo API
            var feat = resp.amiibo,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({ // Add to tableData array
                    "head": feat[i].head,
                    "tail": feat[i].tail,
                    "amiiboSeries": feat[i].amiiboSeries,
                    "character": feat[i].character,
                    "name": feat[i].name,
                    "gameSeries": feat[i].gameSeries,
                    "release_na": feat[i].release.na,
                    "release_eu": feat[i].release.eu,
                    "release_au": feat[i].release.au,
                    "release_jp": feat[i].release.jp,
                    "image": feat[i].image,
                    "type": feat[i].type
                });
            }

            table.appendRows(tableData);
            doneCallback(); // To indicate data has been gathered
        });
    };

    tableau.registerConnector(myConnector); // Registers the connecter with Tableau

    // Create event listeners for when the user clicks the Get Amiibo Data! button
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Amiibo API"; // Data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
