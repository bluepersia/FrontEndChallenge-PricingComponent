//classes

class Plan 
{
    constructor (title, price, storage, usersAllowed, sendAmount)
    {
        this.title = title;
        this.price = price;
        this.storage = storage;
        this.usersAllowed = usersAllowed;
        this.sendAmount = sendAmount;
    }
}





const basicPlanMonthly = new Plan ('Basic', 19.99, 500, 2, 3);
const professionalPlanMonthly = new Plan ('Professional', 24.99, 1000, 5, 10);
const masterPlanMonthly = new Plan ('Master', 39.99, 2000, 10, 20);

const basicPlanAnnually = new Plan ('Basic', 199.99, 500, 2, 3);
const professionalPlanAnnually  = new Plan ('Professional', 249.99, 1000, 5, 10);
const masterPlanAnnually  = new Plan ('Master', 399.99, 2000, 10, 20);

const plansMonthly = [basicPlanMonthly, professionalPlanMonthly, masterPlanMonthly];
const plansAnnually = [basicPlanAnnually, professionalPlanAnnually, masterPlanAnnually];

let currentPlanId = 0;
const getCurrentPlan = () => currentPlanId == 0 ? plansMonthly : plansAnnually;


const toggle = document.querySelector ('.pricing-component input');
const pricePlans = document.querySelectorAll ('.price-plan'); 

toggle.addEventListener ('change', updatePricing);
pricePlans.forEach (pricePlan => pricePlan.addEventListener ('transitionend', ({target}) => Number(target.style.opacity) == 0 ? displayPricing () : 0));

displayPricing ();


function updatePricing ()
{
    currentPlanId = toggle.checked ? 1 : 0;

    pricePlans.forEach (pricePlan => pricePlan.querySelector ('h1').style.opacity = pricePlan.querySelector ('.details').style.opacity = 0);

    
    
}

function displayPricing ()
{
    pricePlans.forEach ((pricePlan, i) =>
    {
        const plan = getCurrentPlan () [i];

        if (currentPlanId == 1)
            pricePlan.classList.add ('annual');
            else
            pricePlan.classList.remove ('annual');

       pricePlan.querySelector('.title').textContent = plan.title;
       
        
       const priceHeading = pricePlan.querySelector ('h1');
        const price = priceHeading.querySelector ('.price');
        price.textContent = plan.price;

        const details = pricePlan.querySelector ('.details');
        details.querySelector ('.storage').textContent = displayStorage (plan.storage);
        details.querySelector ('.users').textContent = plan.usersAllowed;
        details.querySelector ('.send').textContent = displayStorage (plan.sendAmount);

        priceHeading.style.opacity = details.style.opacity = 1;
    });
}

function displayStorage(storage)
{
    return storage >= 1000 ? `${storage / 1000} TB` : `${storage} GB`;
}




