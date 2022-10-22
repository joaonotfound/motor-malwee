import { Encrypter } from '@/domain'
import { MD5Encrypter } from './md5-encrypter'

interface SutTypes { 
  sut: Encrypter
}

jest.mock('md5', () => () => 'hashed_value')
const makeSut = (): SutTypes => {
  const sut = new MD5Encrypter();
  return { sut }

}
describe('MD5Encrypter', () => {
  it('should return an encrypted value', async () => {
    const { sut } = makeSut()
    const value = 'any_value'
    const response = await sut.encrypt(value)
    expect(response).toBe('hashed_value')
  })
})
