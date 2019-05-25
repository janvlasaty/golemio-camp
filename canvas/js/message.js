var Message = {
    animated: false,
    messageElement: document.querySelector('#message'),
    messageTextElement: document.querySelector('#messagetext'),
    update: function(text, left = 1000,  stayDuration = 5000, fadeDuration = '') {  
        var _this = this
        var fadeDurationTime = fadeDuration == '' ? 1000 : fadeDuration == 'slow' ? 2000 : 3000
        if (!_this.animated) {
            _this.animated = true
            _this.messageTextElement.innerHTML = text
            _this.messageElement.style.left = left
            _this.messageElement.className = 'animated fadeInUp '+fadeDuration
            setTimeout(function () {
                _this.messageElement.className = 'animated fadeOutUp '+fadeDuration
                setTimeout(function () {
                    _this.messageElement.className = 'hidden'
                    _this.animated = false
                },fadeDurationTime)
            },stayDuration+fadeDurationTime)
            return true;
        }
        else return 'error > message in animation'
    },
};