describe("CRUD operations from summary", () => {
    describe("GET /summary", () => {
        it("should return all summaries and stauts 200", () => {
            expect(true).toBe(false)
        })

        it("should return a summary by id", () => {
            expect(true).toBe(false)
        })

        it("should return 400 if id is nan", () => {
            expect(true).toBe(false)
        })
    })

    describe("POST /summary/:transcriptionid?", () => {
        it("should post a new summary and return 201 if id is provided and return the summary", () => {
            expect(true).toBe(false)
        })

        it("should return status 400 if transcription id is not provided", () => {
            expect(true).toBe(false)
        })
    })

    describe('DELETE /summary/:transcriptionId?', () => {
        it("should return 201 ", () => {
            expect(true).toBe(false)
        })

        it("should return 401 if transcriptionId is not provided ", () => {
            expect(true).toBe(false)
        })
    })
})