import { HashID } from "@/domain"

export const makeHashIDStub = () => {
    class HashIdStub implements HashID {
        encode(_: number): string {
            return ''
        }
        decode(_: string): number {
            return 0
        }
    }
    return new HashIdStub()
}