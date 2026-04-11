// Google Sheets Submission Logic
const scriptURL = 'https://script.google.com/macros/s/AKfycbxQsCfd2lBTF_7kzL9hWEZIFx9tGRcj0DlEM1yDRDHG9mf9w8XMFV_3gzaOadvr1V2AtA/exec'; // <-- PASTE YOUR COPIED LINK HERE

const firstTimerForm = document.getElementById('first-timer-form');
const membershipForm = document.getElementById('membership-form');

firstTimerForm.addEventListener('submit', e => {
    e.preventDefault();
    submitToGoogleSheet(firstTimerForm, 'FirstTimer');
});

membershipForm.addEventListener('submit', e => {
    e.preventDefault();
    submitToGoogleSheet(membershipForm, 'Membership');
});

function submitToGoogleSheet(form, formType) {
    const btn = form.querySelector('.btn.solid');
    const originalText = btn.value;
    btn.value = "Submitting...";

    // Gather data and append the form identifier
    const formData = new FormData(form);
    formData.append('formType', formType);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert('Registration Successful!');
            form.reset();
            btn.value = originalText;
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('There was an error submitting your form. Please try again.');
            btn.value = originalText;
        });
}