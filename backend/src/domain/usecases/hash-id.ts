
type PUBLIC_ID = string
type PRIVATE_ID = number

export interface HashID {
    encode(value: PRIVATE_ID): PUBLIC_ID
    decode(value: PUBLIC_ID): PRIVATE_ID
}