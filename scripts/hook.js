;
//获取WeChatAppEx.exe的基址
var module = Process.findModuleByName('WeChatAppEx Framework')
var base = module.base;
// console.log("模块名称:",module.name);
// console.log("模块地址:",module.base);
// console.log("大小:",module.size);


send("[+] WeChatAppEx 注入成功!");
send("[+] 等待小程序加载...");

  
  // 过新版8555检测
setImmediate(() => {
    let devToolString = base.add(address.DevToolStringAddr)
    // console.log("[+] devToolString = ", devToolString)
    let oldDevToolString = devToolString.readCString()
    // console.log("[+] oldDevToolString = ", oldDevToolString)

    if (oldDevToolString == "devTools"){
        Memory.protect(devToolString, 8, 'rw-')
        devToolString.writeUtf8String("DevTools")
        Memory.protect(devToolString, 8, 'r--')
        // console.log("[+] newDevToolString = ", devToolString.readCString())
    }

    let devToolsPageString = base.add(address.WechatWebStringAddr)
    let devToolsPageStringVal = devToolsPageString.readCString()
    // console.log("[+] oldDevToolsPageStringVal = ", devToolsPageStringVal)
    if(devToolsPageStringVal == "https://applet-debug.com/devtools/wechat_app.html"){
        Memory.protect(devToolsPageString, 0x20, 'rw-')
        devToolsPageString.writeUtf8String("https://applet-debug.com/devtools/wechat_web.html")
        // console.log("[+] newDevToolsPageStringVal = ", devToolString.readCString())
        Memory.protect(devToolsPageString, 0x20, 'r--')
    }

    Interceptor.attach(base.add(address.JsonGetBoolFunc), { // json_get_bool
        onEnter(args) {
            this.name = args[1].readCString()
        },

        onLeave(retval) {
            if(this.name == "enable_vconsole"){
                // console.log("[+] enable_vconsole detected, replace retval to true")
                retval.replace(1)
            }
        }
    })
    Interceptor.attach(base.add(address.xwebadress), { // json_get_bool
        onLeave(retval) {
                // console.log("[+] enable_vconsole detected, replace retval to true")
            retval.replace(1)
        }
    }) 
})

