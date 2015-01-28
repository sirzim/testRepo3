
var minusSign = String.fromCharCode(8722);

var pointsMax = 27;
var points    = pointsMax;

var vals  = [8, 9, 10, 11, 12, 13, 14, 15];
var costs = [0, 1,  2,  3,  4,  5,  7,  9];

var defaultVal = 8;

var strVal = defaultVal;
var dexVal = defaultVal;
var conVal = defaultVal;
var intVal = defaultVal;
var wisVal = defaultVal;
var chaVal = defaultVal;


function elem(id) {
    return document.getElementById(id);
}

function test(testArg) {
    elem("testDiv").innerHTML =
        parseInt(elem("testDiv").innerHTML) + 1;
    elem("testDiv").innerHTML = "FUCKBITCH";
    abilityScoreIncrement("Str");
}

function abilityScoreIncrement(ability) {
    abilityScoreChange(ability, 1);
}

function abilityScoreDecrement(ability) {
    abilityScoreChange(ability, -1);
}

function abilityScoreChange(ability, changeAmt) {
    var abilityScoreCurrent =
        parseInt(elem("input" + ability + "Val").value);
    var abilityScoreNew = abilityScoreCurrent + parseInt(changeAmt);

    var changeCost =
        costs[vals.indexOf(abilityScoreNew)] -
        costs[vals.indexOf(abilityScoreCurrent)];

    // Edge Case: changeAmt makes ability score invalid:
    if (abilityScoreNew < vals[0] || abilityScoreNew > vals[vals.length - 1]) {
        return;
    }

    // Edge Case: changeCost is more than available points:
    if (changeCost > points) {
        return;
    }

    pointsChange(changeCost);
    elem("input" + ability + "Val").value = abilityScoreNew;
    recalculateMod(ability);
}

function pointsChange(change) {
    points -= change;
    elem("labelPoints").innerHTML = points;
}

function recalculateMod(ability) {
    var val = parseInt(elem("input" + ability + "Val").value);
    var mod = Math.floor((val - 10) / 2);

    if(mod < 0) {
        elem("input" + ability + "Mod").value = minusSign + (-mod);
    } else {
        elem("input" + ability + "Mod").value = mod;
    }
}

window.onload = function onLoad() {

    // Set points value.
    elem("labelPoints").innerHTML = points;

    // Populate ability score value and modifier text-input-boxes with defaults.
    for (   abilities = ["Str", "Dex", "Con", "Int", "Wis", "Cha"],
            i = 0;
            i < abilities.length;
            i++
    ) {
        elem("input" + abilities[i] + "Val").value =
            defaultVal;
        elem("input" + abilities[i] + "Mod").value =
            minusSign + "1";
    }

};

