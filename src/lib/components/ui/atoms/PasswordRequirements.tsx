import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react';

interface Errors {
  password_register?: {
    types?: {
      matches?: string;
      min?: string;
    };
  };
  new_password?: {
    types?: {
      matches?: boolean;
      min?: string;
    };
  };
}

interface PasswordRequirementsProps {
  errors: Errors;
}

export const PasswordRequirements: FC<PasswordRequirementsProps> = ({ errors }) => {
  let errArr:string = ""

  if (
    (errors.password_register && errors.password_register.types) ||
    (errors.new_password && errors.new_password.types)
  ) {
    if (errors.password_register && errors?.password_register?.types?.matches) {
      errArr = errArr + errors.password_register.types.matches
    } else if (errors.new_password && errors?.new_password?.types?.matches) {
      errArr = errArr + errors.new_password.types.matches
    }
    if (errors.password_register && errors?.password_register?.types?.min) {
      errArr = errArr + errors.password_register.types.min
    } else if (errors.new_password && errors?.new_password?.types?.min) {
      errArr = errArr + errors?.new_password.types?.min
    }
  }

  return (
    <div className="text-xs mb-4 mt-4">
      {"t('password_req')"}
      <ul className="ml-2">
        <li>
          {errArr && !errArr.includes("t('password_length')")
            ? (
              <FontAwesomeIcon className="mr-1 text-blue-light" icon="check" />
            )
            : (
              <FontAwesomeIcon className="mr-1 text-red" icon="check" />
            )}
          {"t('password_req_min_char')"}{' '}
        </li>
        <li>
          {errArr && !errArr.includes("t('password_req_uppercase')")
            ? (
              <FontAwesomeIcon className="mr-1 text-blue-light" icon="check" />
            )
            : (
              <FontAwesomeIcon className="mr-1 text-red" icon="check" />
            )}
          {"t('password_req_uppercase')"}{' '}
        </li>
        <li>
          {errArr && !errArr.includes("t('password_req_lowercase')")
            ? (
              <FontAwesomeIcon className="mr-1 text-blue-light" icon="check" />
            )
            : (
              <FontAwesomeIcon className="mr-1 text-red" icon="check" />
            )}
          {"t('password_req_lowercase')"}{' '}
        </li>
        <li>
          {errArr && !errArr.includes("t('password_req_number')")
            ? (
              <FontAwesomeIcon className="mr-1 text-blue-light" icon="check" />
            )
            : (
              <FontAwesomeIcon className="mr-1 text-red" icon="check" />
            )}
          {"t('password_req_number')"}{' '}
        </li>
        <li>
          {errArr && !errArr.includes("t('password_req_special_char')")
            ? (
              <FontAwesomeIcon className="mr-1 text-blue-light" icon="check" />
            )
            : (
              <FontAwesomeIcon className="mr-1 text-red" icon="check" />
            )}
          {`${"t('password_req_special_char')"}: ^ $ * . [ ] { } ( ) ? " ! @ # % & , > < ' : ; _ ~  \` \\ |`}
        </li>
      </ul>
    </div>
  )
}


