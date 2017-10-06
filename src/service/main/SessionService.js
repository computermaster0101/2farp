import uuidv4 from 'uuid/v4'

class Session {

    constructor(username, sourceIP, sourceHostname, keyHash, timeoutInterval = 300*1000){
        this.id = uuidv4()
        this.username = username
        this.sourceIP = sourceIP
        this.sourceHostname = sourceHostname
        this.keyHash = keyHash
        this.timeoutInterval = timeoutInterval
        this.timestamp = new Date().getTime()
        this.timerId = this.timeout(this.timeoutInterval)
    }

    timeout(timeoutInterval){
        return setTimeout(() => {
            let currentTime = new Date().getTime()
            let elapsedTime = currentTime - this.timestamp
            if(elapsedTime < this.timeoutInterval){
                let timer = timeoutInterval - elapsedTime
                this.timerId = this.timeout(timer)
            }else{
                this.timerId = this.timeout(this.timeoutInterval)
            }
        }, timeoutInterval)
    }

    updateTimestamp(){
        this.timestamp = new Date().getTime()
    }

    remove(){
        this.username = null
        this.sourceIP = null
        this.sourceHostname = null
        this.keyHash = null
        this.timestamp = null
        this.timeoutInterval = null
        clearTimeout(this.timerId)
    }
}


let instance = null

export default class SessionService {

    constructor(){
        if(!instance){
          this.state = new Map()
          instance = this
        }
        return this
    }

    static getInstance() {
        if(!instance) {
          instance = new SessionService()
        }
        return instance
    }

    create(sessionInfo){
        let session = new Session({username: sessionInfo.username, sourceIP: sessionInfo.sourceIP, sourceHostname: sessionInfo.sourceHostname, keyHash: sessionInfo.keyHash})
        this.state.set(session.id, session)
        return {id: session.id, key: sessionInfo.key}
    }

    removeById(sessionId){
        this.state.get(sessionId).remove()
        this.state.delete(sessionId)
    }

    remove(sessionInfo){
        if(typeof(sessionInfo.username) === "undefined"
            || typeof(sessionInfo.sourceIP) === "undefined"
            || typeof(sessionInfo.sourceHostname) === "undefined"){

            throw new Error("SessionService: invalid state occurred, please fix your code.")

        }
        for (let [ sessionId, session ] of this.state.entries()) {
            if(session.username === sessionInfo.username
                && session.sourceIP === sessionInfo.sourceIP
                && session.sourceHostname === sessionInfo.sourceHostname){
                session.remove()
                this.state.delete(sessionId)
                break
            }
        }
    }

    updateTimestamp(sessionId){
        this.state.get(sessionId).updateTimestamp()
    }

    getById(sessionId){
        return this.state.get(sessionId)
    }

}