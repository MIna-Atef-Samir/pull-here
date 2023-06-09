const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const mnum = document.getElementById('mnum');
const addr1 = document.getElementById('addr1');
const addr2 = document.getElementById('addr2');
const country = document.getElementById('country');
const Place_Order = document.getElementById('Place_Order');
const city = document.getElementById('city');
const state = document.getElementById('state');
const zip = document.getElementById('zip');
const done = document.getElementById('done');
const paypal = document.getElementById('paypal');
const directcheck = document.getElementById('directcheck');
const banktransfer = document.getElementById('banktransfer');
const payment = document.getElementById('payment');

Place_Order.addEventListener('click', ()=>{

    if(paypal.checked || directcheck.checked || banktransfer.checked){
        payment.classList.remove('dangger');

        if(!fname.value || !lname.value || !email.value || !mnum.value || !addr1.value || !addr2.value || !city.value || !state.value || !zip.value || !country.value){
                alert("Please Complete all the required fields")
            }else{
                done.classList.add('done')
                done.classList.remove('hide')
            }
            if(!fname.value){
                fname.classList.add('dangger');
            }else{
                fname.classList.remove('dangger');
    
            }
            if(!lname.value){
                lname.classList.add('dangger');
            }else{
                lname.classList.remove('dangger');
    
            }
            if(!email.value){
                email.classList.add('dangger');
            }else{
                email.classList.remove('dangger');
    
            }
            if(!mnum.value){
                mnum.classList.add('dangger');
            }else{
                mnum.classList.remove('dangger');
    
            }
            if(!addr1.value){
                addr1.classList.add('dangger');
            }else{
                addr1.classList.remove('dangger');
    
            }
            if(!addr2.value){
                addr2.classList.add('dangger');
            }else{
                addr2.classList.remove('dangger');
    
            }
            if(!country.value){
                country.classList.add('dangger');
            }else{
                country.classList.remove('dangger');
    
            }
            if(!city.value){
                city.classList.add('dangger');
            }else{
                city.classList.remove('dangger');
    
            }
            if(!state.value){
                state.classList.add('dangger');
            }else{
                state.classList.remove('dangger');
    
            }
            if(!zip.value){
                zip.classList.add('dangger');
            }else{
                zip.classList.remove('dangger');
    
            }
    
            if(done.classList.contains('done')){
                setTimeout(()=>{
                    done.classList.remove('done')
                    done.classList.add('hide')
                },4000)
            }
    }else{
        payment.classList.add('dangger');
        alert('Choose Payment Method First!')
    }
})

