import { auth, fireDB } from '../firebase'

const UserDetailsCollectionRef = fireDB.collection('users');

class UserDetails {
    constructor ({
        uid,name,contact,location,completed,email
    }) {
        this.name = name;
        this.contact = contact;
        this.location = location;
        this.uid = uid;
        this.completed = completed;
        this.email = email;
    }

    async addUserDetails () {
        console.log("entered userdetails");
        await UserDetailsCollectionRef.add({
            name: `${this.name}` ,
            contact : `${this.contact}`,
            address : `${this.location}`,
            email : `${this.email}`,
            completed: this.completed

        });
    }

    // async updateUserDetails (detailsToUpdate = {}) {
    //     const ref = UserDetailsCollectionRef.doc(this.uid);
    //     try {
    //         await ref.set({
    //           ...detailsToUpdate
    //         }, {merge: true});
    //       } catch (error) {
    //         console.log("inside error here ==", {error});
    //       }
    // }

    // async deleteUserDetails () {
    //     // To Do as home work
    // }
}

export { UserDetails, UserDetailsCollectionRef }
