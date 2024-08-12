import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const createValidationSchema = (config) => {
  const shape = {};

  config.forEach((field) => {
    let validator = Yup.string();

    if (field.validation) {
      if (field.validation.required) {
        validator = validator.required('This field is required.');
      }
      if (field.validation.minLength) {
        validator = validator.min(field.validation.minLength, `Minimum length is ${field.validation.minLength}.`);
      }
      if (field.validation.maxLength) {
        validator = validator.max(field.validation.maxLength, `Maximum length is ${field.validation.maxLength}.`);
      }
      if (field.validation.pattern) {
        validator = validator.matches(new RegExp(field.validation.pattern), 'Invalid format.');
      }
    }

    shape[field.name] = validator;
  });

  return Yup.object().shape(shape);
};

const defaultConfig = [];

const DynamicForm = ({ config }) => {
  const initialValues = {};
  config.forEach((field) => {
    initialValues[field.name] = '';
  });

  const validationSchema = createValidationSchema(config);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log('Form data:', values);
            }}
          >
            {() => (
              <Form>
                {config.map((field) => (
                  <div className="mb-3" key={field.name}>
                    <label htmlFor={field.name} className="form-label">
                      {field.label}
                    </label>
                    <Field
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      id={field.name}
                      className="form-control"
                    />
                    <ErrorMessage name={field.name} component="div" className="text-danger mt-2" />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary w-100">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

DynamicForm.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string,
      validation: PropTypes.shape({
        required: PropTypes.bool,
        minLength: PropTypes.number,
        maxLength: PropTypes.number,
        pattern: PropTypes.string,
      }),
    })
  ).isRequired,
};

DynamicForm.defaultProps = {
  config: defaultConfig,
};

export default DynamicForm;