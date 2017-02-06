class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (!config) throw new Error;
        this._config = config;
        this._activeState = config.initial;
        this._statesHistory = [];
        this._states = config.states;
        this._redu;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._activeState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!!this._states[state]){
        this._statesHistory.push(this._activeState);
        this._activeState = state;
        } else throw new Error; 
    }
    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let transitions = this._states[this._activeState].transitions;
        if (!!transitions[event]){
             this.changeState(transitions[event]);
        }else throw new Error;

    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this._config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let states = [];
        if (!event) {
            for (var state in this._states){
                states.push(state);
            } 
        } else for(var state in this._states){
            let transitions = this._states[state].transitions;
            if (!!transitions[event]) states.push(state);
        }
        return states;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        let prevState = this._statesHistory.pop();
        if(!!prevState){
            this._activeState = prevState;
            this._undoingState = prevState;
            return true;
        } else return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if(!this._undoingState) return false;
        this.changeState(this._undoingState);
        delete this._undoingState;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
