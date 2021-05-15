const original_url = document.getElementById('initial-url');
const new_url = document.getElementById('new-url');
const generateBtn = document.querySelector('.generate');
const token = 'fcd27195cfcf55a05587b3d569f32c94f5c8d740';

// Function To Shorten The Original URL
const shortenUrl = (val)=>{
    const dataObject = {long_url:original_url.value, domain: 'bit.ly'};

    fetch('https://api-ssl.bitly.com/v4/shorten',{
        method: "POST",
        headers:{
            Authorization: `Bearer ${token}`, "Content-Type": "application/json"
        },
        body: JSON.stringify(dataObject),
    }).then(response =>{
        if(response.ok){
            return response.json();
        }else{
            return Promise.reject(response.status);
        }
    }).then(json =>{
        new_url.innerHTML = json.link;
    }).catch(err =>{
        console.log(err);
    })
}

// Generate Button Action
generateBtn.addEventListener('click', e=>{
    e.preventDefault();
    shortenUrl(original_url.value);
});

//Copy to clipboard
const clipboard = new ClipboardJS('#copy');
clipboard.on('success', function(e){
    console.info('Action', e.action);
    console.info('Text', e.text);
    console.info('Trigger', e.trigger);

    e.clearSelection();
});
clipboard.on('error', function(e){
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});