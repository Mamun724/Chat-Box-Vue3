import {createStore} from "vuex";
import {delaySim} from "./utils";
import {constants} from "@/constants";

export default createStore({
    devtools: true,
    state: {
        registeredUsers: [
            {
                fullName: "User 1",
                username: "user1",
                email: "user1@email.com",
                password: "123456",
                profilePicture: "/assets/user1.jfif"
            },
            {
                fullName: "User 2",
                username: "user2",
                email: "user2@email.com",
                password: "123456",
                profilePicture: "/assets/user2.png"
            },
            {
                fullName: "User 3",
                username: "user3",
                email: "user3@email.com",
                password: "123456",
                profilePicture: "/assets/user3.jfif"
            },
            {
                fullName: "User 4",
                username: "user4",
                email: "user4@email.com",
                password: "123456",
                profilePicture: "/assets/user4.jfif"
            },
            {
                fullName: "User 5",
                username: "user5",
                email: "user5@email.com",
                password: "123456",
                profilePicture: "/assets/user5.jpg"
            },
        ],
        authenticatedUser: {
            fullName: "User 5",
            username: "user5",
            email: "user5@email.com",
            password: "123456",
            profilePicture: "/assets/user5.jpg"
        },
        receiverUser: null,
        friendsGraph: {
            "user1@email.com": ["user2@email.com", "user3@email.com", "user5@email.com"],
            "user2@email.com": ["user1@email.com", "user5@email.com"],
            "user3@email.com": ["user1@email.com", "user4@email.com", "user5@email.com"],
            "user4@email.com": ["user3@email.com", "user5@email.com"],
            "user5@email.com": ["user3@email.com", "user2@email.com", "user1@email.com", "user4@email.com"],
        },
        messages: [],
        boardSize: 3,
        gameStates: new Map(),
        timeoutDuration: 10,
        gameEnded: false,
        playGame: false
    },
    getters: {
        findUser(state) {
            return (email) => state.registeredUsers.find((user) => user.email === email);
        },
        isAuthenticated(state) {
            return state.authenticatedUser != null;
        },
        getAuthenticatedUser(state) {
            return state.authenticatedUser;
        },
        getMessages(state) {
            return state.messages;
        },
        getReceiver(state) {
            return state.receiverUser;
        },
        getFriends(state) {
            return (userEmail) =>
                state.friendsGraph[userEmail];
        },
        getLatestGameState(state) {
            return (opponentEmail) => {
                const gameStates = state.gameStates.get(opponentEmail);
                const lastIndex = gameStates.length - 1;
                if (lastIndex < 0) {
                    throw new Error("Game state is not initialized!");
                }

                return gameStates[lastIndex];
            }
        },
        IsGameEnded(state) {
            return state.gameEnded;
        }
    },
    mutations: {
        registerUser(state, user) {
            state.registeredUsers.push(user);
        },
        setAuthUser(state, authUser) {
            state.authenticatedUser = authUser;
        },
        addMessage(state, message) {
            state.messages.push((message));
        },
        setReceiver(state, user) {
            state.receiverUser = user;
        },
        modifyFriend(state, {userEmail, friendEmail, add = true}) {
            if (!Object.keys(state.friendsGraph).includes(userEmail)) {
                state.friendsGraph = {
                    ...state.friendsGraph,
                    [userEmail]: []
                }
            }

            if (!Object.keys(state.friendsGraph).includes(friendEmail)) {
                state.friendsGraph = {
                    ...state.friendsGraph,
                    [friendEmail]: []
                }
            }

            if (add) {
                state.friendsGraph[userEmail].push(friendEmail);
                state.friendsGraph[friendEmail].push(userEmail);
            } else {
                state.friendsGraph[userEmail] = state.friendsGraph[userEmail].filter(email => email !== friendEmail);
                state.friendsGraph[friendEmail] = state.friendsGraph[friendEmail].filter(email => email !== userEmail);
            }
        },
        initGame(state, opponentEmail) {
            const boardSize = state.boardSize;
            const board = [];
            for (let i = 0; i < boardSize * boardSize; i++) {
                board.push("");
            }
            if (!state.gameStates.has(opponentEmail)) {
                state.gameStates.set(opponentEmail, [{
                    playerTurn: constants.ownSymbol,
                    board
                }]);
            }
        },
        addGameState(state, {opponentEmail, gameState}) {
            const gameStates = state.gameStates.get(opponentEmail);
            gameStates.push(gameState)
        },
        setGameEnd(state, stop) {
            state.gameEnded = stop;
        },
        setPlayGame(state, playGame) {
            state.playGame = playGame;
        }
    },
    actions: {
        async registerUser({commit, state}, user) {
            await delaySim(300);
            commit("registerUser", user);

            //Add 2 friends randomly
            let existingUsers = Object.keys(state.friendsGraph);
            let friendList = [];
            while (friendList.length < 2) {
                let index = Math.floor(Math.random() * existingUsers.length);
                let email = existingUsers[index];
                if (!friendList.includes(email)) {
                    commit("modifyFriend", {
                        userEmail: user.email,
                        friendEmail: email,
                        add: true
                    });
                    friendList.push(email);
                }
            }
        },
        async loginUser({commit, getters}, loginData) {
            await delaySim(300);
            const user = getters.findUser(loginData.email);
            if (!user || user.password !== loginData.password) {
                return null;
            }

            commit("setAuthUser", user);

            return user;
        },
        async logoutUser({commit}) {
            await delaySim(300);
            commit("setAuthUser", null);
            commit("setReceiver", null);
        },
        async sendMessage({commit}, message) {
            await delaySim(300);
            commit("addMessage", message);
        },
        async unfriend({commit, getters}, friend) {
            await delaySim(300);

            let authUser = getters.getAuthenticatedUser;

            commit(
                "modifyFriend", {
                    userEmail: authUser.email,
                    friendEmail: friend.email,
                    add: false
                }
            );

            if (getters.getReceiver && getters.getReceiver.email === friend.email) {
                commit("setReceiver", null);
            }
        },
        async initGame({commit, getters}, opponent) {
            await delaySim(300);
            commit("initGame", opponent.email);
        }
    },
});
