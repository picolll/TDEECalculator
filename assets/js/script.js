$(function () {

// TDEE = BMR + TEA + TEF + NEAT
// TDEE = Total Daily Energy Expenditure
//    BMR - podstawowa przemiana materii
//    BMR - Base Metabolic Rate
//    TEA - ponadpodstawowa przemiana materii
//    TEA - Thermic Effect of Activity
//    TEA = ((trening siłowy (intensywność) + EPOC) + (trening aerobowy (intensywność) + EPOC) / 7
//    TEF - efekt termiczny pożywienia
//    TEF - Thermic Effect of Food
//    NEAT - kalorie spalane podczas codziennych czynności
//    NEAT - Non-Exercise Activity Thermogenesis

    var bmr, bodyWeight, height, age, isMale, tea, neat, bodyType, tef, tdee, tdee_500,
        sredniCzasTreninguSilowego, liczbaTreningowSilowychwTygodniu, intensywnoscTreninguSilowego, intensywnoscTreninguSilowegoProcent,
        sredniCzasTreninguAerobowego, liczbaTreningowAerobowychTygodniu, intensywnoscTreninguAerobowego, intensywnoscTreninguAerobowegoProcent,
        protein, fat, carbs;

    age        = 34;
    height     = 176;
    bodyWeight = 83;
    isMale     = true;
    neat       = 300; // 200 - 900
    bodyType = 6; // 6 endo , 8 mezo , 10 ekto

//    Mężczyźni:
//        BMR=(9,99 X masa ciała (kg)) + (6,25 X wzrost (cm)) - (4,92 X wiek) + 5
//    Kobiety:
//        BMR= (9,99 X masa ciała (kg)) + (6,25 X wzrost (cm)) - (4,92 X wiek) - 161

    const baseBMR = (9.99 * parseInt(bodyWeight)) +
        6.25 * parseInt(height) -
        4.92 * parseInt(age);
    if (isMale) {
        bmr = baseBMR + 5;
    } else {
        bmr = baseBMR - 161;
    }

    renderRow('BMR', parseInt(bmr));


    sredniCzasTreninguSilowego       = 70;
    liczbaTreningowSilowychwTygodniu = 3;
    intensywnoscTreninguSilowego     = 9; // 7 / 8 / 9    4. 5.5 7
    intensywnoscTreninguSilowegoProcent = 7; //    4 / 5.5 / 7

//    sredniCzasTreninguAerobowego      = 15;
//    liczbaTreningowAerobowychTygodniu = 1;
//    intensywnoscTreninguAerobowego    = 180; // 5 / 35 / 180
//    intensywnoscTreninguAerobowegoProcent = 10; // 5 / 7.5 / 10

    sredniCzasTreninguAerobowego      = 0;
    liczbaTreningowAerobowychTygodniu = 0;
    intensywnoscTreninguAerobowego    = 0; // 5 / 35 / 180
    intensywnoscTreninguAerobowegoProcent = 5; // 5 / 7.5 / 10


    tea = ( ( sredniCzasTreninguSilowego * liczbaTreningowSilowychwTygodniu * intensywnoscTreninguSilowego ) +
        ( liczbaTreningowSilowychwTygodniu * (intensywnoscTreninguSilowegoProcent / 100 * parseInt(bmr) ) ) +
        ( (sredniCzasTreninguAerobowego * liczbaTreningowAerobowychTygodniu * intensywnoscTreninguAerobowegoProcent) + intensywnoscTreninguAerobowego ) ) / 7;

    renderRow('TEA', parseInt(tea));

    tef = ( bodyType / 100) * (bmr + tea + neat);

    renderRow('TEF', parseInt(tef));
    renderRow('NEAT', parseInt(neat));

    tdee = bmr + tea + tef + neat;

    renderRow('TDEE', parseInt(tdee));

    tdee_500 = tdee -500; // Deficyt
    renderRow('TDEE -500', parseInt(tdee_500));

    protein = bodyWeight * 2.4;

    renderRow('Protein', parseInt(protein));

    fat = 0.99 * bodyWeight;
    renderRow('Fat', parseInt(fat));

    carbs = (tdee - protein * 4 - fat * 9) / 4;
    renderRow('Carbs', parseInt(carbs));

    carbs = (tdee_500 - protein * 4 - fat * 9) / 4;
    renderRow('Carbs -500', parseInt(carbs));

    function renderRow(key, value) {

        var row = $("<tr  />");
        $("#resultsTable").append(row);
        row.append($("<td>" + key + "</td>"));
        row.append($("<td>" + value + "</td>"));

    }


});
