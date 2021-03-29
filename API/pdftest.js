var pdfFiller = require('pdffiller');
testypdfy();

function testypdfy() {

    var data = {
        "last_name": "John",
        "first_name": "Doe",
        "date": "Jan 1, 2013",
        "football": "Off",
        "baseball": "Yes",
        "basketball": "Off",
        "hockey": "Yes",
        "nascar": "Off"
    };
    console.log('generating pdf!');
    var sourcePDF = "test/test.pdf";
    var destinationPDF = "test/test_complete.pdf";

    pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("In callback (we're done).");
    });

}
