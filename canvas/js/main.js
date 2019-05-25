document.addEventListener("DOMContentLoaded", function(event) {
    setTimeout(function(){
        document.querySelectorAll('.container').forEach(c=>{
            c.className = 'container hidden'
        })

        // Screenplay.play('parking')
    },3000)
})


