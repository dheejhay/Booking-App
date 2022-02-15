require('../model/mongooseConnection')

exports.index = async (req, res) => {
    const navigations = [{
            name: "Waakye Queue",
            path: '/logics/waakye-logic',
            description: "You went to buy waakye at joint1, you were told to move to joint2 if the queue is long and to joint3 if there are more women",
            date: "26/01/2022"
        },
        {
            name: "Lunch Logic",
            path: '/logics/lunch-logic',
            description: "You can eat banku/jollof for lunch. You will go for jollof if you took porridge or milo for breakfast. If you ate kenkey for breakfast, then you will skip lunch, however you will eat banku if you skipped breakfast",
            date: "02/02/2022"
        }
    ];
    res.render("logics/index", {navigations});
};

exports.queueLength = async (req, res) => {
    res.render("logics/waakye_logic", {decision: ""});
};

exports.queueDecision = async (req, res) => {
    const allowedQueueLength = 15;
    const QueueLength = req.body.queue_length || 0;
    let noOfWomen = req.body.number_of_women || 0;
    let noOfMen = req.body.number_of_men

    if (noOfMen === 0) {
        if (noOfWomen > 0) {
            if (queueLength > 0) {
                noOfMen = queueLength - noOfWomen;
            }
        }
    }

    let decision = "";
    res.render("logics/waakye_logic")
}

exports.lunch = async (req, res) => {
    let decision ="";
    res.render("logics/lunch", {decision: 'Decision will be made based on your input'})
}

const lunchSelect = (breakfast) => {
    let lunch = "";
    if(breakfast == "milo" || breakfast == "porridge") {
        lunch = "You will eat jollof"
    }
    else if (breakfast == "Kenkey") {
        lunch = "There is no lunch available"
    } else {
        lunch = "You will eat banku"
    }

    return lunch;
}

exports.lunchDecision = async (req, res) => {
    // console.log(req.body)
    let breakfast = req.body.breakfast
    let decision = lunchSelect(breakfast)

  res.render("logics/lunch", {title: "lunch-logic", decision})
}
