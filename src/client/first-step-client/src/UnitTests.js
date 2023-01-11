import React from 'react';
import { shallow } from 'enzyme';
import { StudentProfile } from './StudentProfile';

const mockNewStudentProfile = jest.fn();
const mockUploadStudentCert = jest.fn();
const mockSetAlert = jest.fn();
const mockUser = { _id: '123' };

const props = {
    user: mockUser,
    newStudentProfile: mockNewStudentProfile,
    setAlert: mockSetAlert,
    uploadStudentCert: mockUploadStudentCert,
};

describe('StudentProfile', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<StudentProfile {...props} />);
    });

    test('it should render correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('it should call newStudentProfile and uploadStudentCert on form submit', async () => {
        const formData = {
            name: 'John Doe',
            dateOfBirth: '1990-01-01',
            city: 'New York',
            skills: ['JavaScript', 'React'],
            description: 'I am a skilled software developer',
            availability: [],
        };
        const educationData = {
            school: 'University of XYZ',
            degree: 'Computer Science',
            from: '2010-01-01',
            to: '2014-01-01',
            current: true,
        };
        const availabilityData = {
            sunday: false,
            monday: true,
            tuesday: true,
            wednesday: true,
            thursday: true,
            friday: true,
            saturday: false,
        };

        const file = new File([], 'certification.pdf');
        const fileInput = wrapper.find('input[type="file"]');
        fileInput.simulate('change', { target: { files: [file] } });

        wrapper.find('input[name="name"]').simulate('change', { target: { value: formData.name } });
        wrapper.find('input[name="dateOfBirth"]').simulate('change', { target: { value: formData.dateOfBirth } });
        wrapper.find('input[name="city"]').simulate('change', { target: { value: formData.city } });
        wrapper.find('input[name="skills"]').simulate('change', { target: { value: formData.skills.join(',') } });
        wrapper.find('textarea[name="description"]').simulate('change', { target: { value: formData.description } });
        wrapper.find('input[name="school"]').simulate('change', { target: { value: educationData.school } });
        wrapper.find('select[name="degree"]').simulate('change', { target: { value: educationData.degree } });
        wrapper.find('input[name="from"]').simulate('change', { target: { value: educationData.from } });
        wrapper.find('input[name="to"]').simulate('change', { target: { value: educationData.to } });
        wrapper.find('input[name="sunday"]').simulate('change', { target: { checked: availabilityData.sunday } });
        wrapper.find('input[name="monday"]').simulate('change', { target: { checked: availabilityData.monday } });
        wrapper.find('input[name="tuesday"]').simulate('change', { target: { checked: availabilityData.tuesday } });
        wrapper.find('input[name="wednesday"]').simulate('change', { target: { checked: availabilityData.wednesday } });
        wrapper.find('input[name="thursday"]').simulate('change', { target: { checked: availabilityData.thursday } });
        wrapper.find('input[name="friday"]').simulate('change', { target: { checked: availabilityData.friday } });
        wrapper.find('input[name="saturday"]').simulate('change', { target: { checked: availabilityData.saturday } });

        wrapper.find('form').simulate('submit');

        expect(mockNewStudentProfile).toHaveBeenCalledWith(formData, educationData, availabilityData, mockUser._id, expect.any(Function));
        expect(mockUploadStudentCert).toHaveBeenCalledWith(mockUser._id, expect.any(FormData));
    });

    test('it should call setAlert if degree is not selected', () => {
        wrapper.find('form').simulate('submit');

        expect(mockSetAlert).toHaveBeenCalledWith('Degree Must Be Selected', 'danger');
    });
});
