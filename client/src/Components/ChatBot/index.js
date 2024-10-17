import React, { useEffect } from 'react';

const ChatBot = () => {
    useEffect(() => {
        (function (d, m) {
            var kommunicateSettings = { 
                "appId": "12943adce8f4e1d0807c7aaa8ebea4c52", 
                "popupWidget": true, 
                "automaticChatOpenOnNavigation": true 
            };
            var s = document.createElement("script");
            s.type = "text/javascript";
            s.async = true;
            s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
            var h = document.getElementsByTagName("head")[0];
            h.appendChild(s);
            window.kommunicate = m;
            m._globals = kommunicateSettings;
        })(document, window.kommunicate || {});
    }, []);

    return (
        <div>
            {/* Your component code */}
        </div>
    );
};

export default ChatBot;


