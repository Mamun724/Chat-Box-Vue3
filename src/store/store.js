import Vue from "vue";
import Vuex from "vuex";
import {delaySim} from "./utils";

Vue.use(Vuex);

export default new Vuex.Store({
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
        authenticatedUser: null,
        receiverUser: null,
        friendsGraph: {
            "user1@email.com": ["user2@email.com", "user3@email.com", "user5@email.com"],
            "user2@email.com": ["user1@email.com", "user5@email.com"],
            "user3@email.com": ["user1@email.com", "user4@email.com", "user5@email.com"],
            "user4@email.com": ["user3@email.com", "user5@email.com"],
            "user5@email.com": ["user3@email.com", "user2@email.com", "user1@email.com", "user4@email.com"],
        },
        messages: []
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
        updateFriendList(state, {userEmail, newFriendList}) {
            state.friendsGraph[userEmail] = newFriendList;
        }
    },
    actions: {
        async registerUserAsync({commit}, user) {
            await delaySim(300);
            commit("registerUser", user);
        },
        async loginUserAsync({commit, getters}, loginData) {
            await delaySim(300);
            const user = getters.findUser(loginData.email);
            if (!user || user.password !== loginData.password) {
                return null;
            }

            commit("setAuthUser", user);

            return user;
        },
        logoutUser({commit}) {
            commit("setAuthUser", null);
            commit("setReceiver", null);
        },
        async sendMessageAsync({commit}, message) {
            await delaySim(300);
            commit("addMessage", message);
        },
        async unfriend({commit, getters}, friend) {
            await delaySim(300);

            let authUser = getters.getAuthenticatedUser;

            let friends = getters.getFriends(authUser.email);
            let updatedFriendList = friends.filter(email => email !== friend.email);
            commit(
                "updateFriendList",
                {
                    userEmail: authUser.email,
                    newFriendList: updatedFriendList
                }
            );

            friends = getters.getFriends(friend.email);
            updatedFriendList = friends.filter(email => email !== authUser.email);
            commit(
                "updateFriendList",
                {
                    userEmail: friend.email,
                    newFriendList: updatedFriendList
                }
            );
        }
    },
});
