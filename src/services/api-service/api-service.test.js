import ApiService from './api-service';

jest.mock('../../config/app-config', () => ({
    api: {
        baseUrl: 'https://test-site.com'
    }
}));

describe('api-service', () => {
    it('getFullApiUrl', () => {
        expect(ApiService.getFullApiUrl('my-api-method')).toEqual('https://test-site.com/my-api-method');
    })
});