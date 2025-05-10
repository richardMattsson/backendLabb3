import { defineStore } from 'pinia';
import axios from 'axios';

export const useRatingStore = defineStore('ratings', {
    state: () => {
        return {
            avgRatingByUser: [],
            userScore: null,
            givenScore: null,
        }
    },
    actions: {
        async getAvgRating() {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/rating`
                );
                this.avgRatingByUser = res.data;
            }
            catch (err) {
                this.error = err.message;
            }
        },

        async getUserScore(doerEmail, creatorEmail) {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/score?doerEmail=${doerEmail}&creatorEmail=${creatorEmail}`
                );
                this.userScore = res.data;
            }
            catch (err) {
                this.error = err.message;
            }
        },

        async addUserToRating(doerEmail) {
            const newUserRating = {
                username: doerEmail,
                givenRating: []
            }
            console.log(newUserRating);
            try {
                const response = await axios.post(
                    'http://localhost:3000/api/rating',
                    newUserRating
                );

                console.log('Servern svarade med:', response.data);
            } catch (error) {
                console.error('Något gick fel:', error.message);
            }
        },

        async addNewScore(doerEmail, score, creatorEmail) {
            const newScore = {
                username: doerEmail,
                score: score,
                ratedBy: creatorEmail
            }
            try {
                const response = await axios.patch('http://localhost:3000/api/score', newScore)
                console.log('Servern svarade med:', response.data);
                this.givenScore = response.data;
            }
            catch (error) {
                this.error = error.message;
            }
        },

        async deleteScore(id) {
            try {
                const response = await axios.delete(`http://localhost:3000/api/score/${id}`)
                console.log('Servern svarade med:', response.data);
            }
            catch (error) {
                this.error = error.message;
            }
        }
    }
})