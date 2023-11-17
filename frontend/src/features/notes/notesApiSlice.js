import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initalState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError // even if response.status === 200 there could be an error
            },
            keepUnusedDataFor: 5, // default is 60 secs and more suitable for deployment
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id // we use normalized data and it expects an id property 
                    return note
                })
                return notesAdapter.setAll(initalState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'note', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'note', id }))
                    ]
                } else return [{ type: 'note', id: 'LIST' }]
            }
        }),
        addNewNote: builder.mutation({
            query: initalNote => ({
                url: '/notes',
                method: 'POST',
                body: { ...initalNote }
            }),
            invalidatesTags: [
                { type: 'Note', id: 'LIST' }
            ]
        }),
        updateNote: builder.mutation({
            query: initalNote => ({
                url: '/notes',
                method: 'PATCH',
                body: { ...initalNote }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        })
    })
})

// rtk query generates hooks based on the endpoints
export const { useGetNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation } = notesApiSlice

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// creates memoized selector
const selectNotesData = createSelector(selectNotesResult, notesResult => notesResult.data) // normalized state object with ids & entities

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initalState)