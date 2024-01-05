import { Component } from 'react';
import { Contact } from '@workshop/data-access';

export type ContactDetailsProps = { contact?: Contact };

export class ContactDetails extends Component<unknown, ContactDetailsProps> {
  constructor(props: ContactDetailsProps) {
    super(props);
    this.state = { ...props };
  }

  render() {
    return (
      <div className="relative m-4 mt-6 h-96 flex-1 overflow-hidden rounded-xl border border-dashed border-gray-400 pt-10 text-center opacity-75 sm:px-0">
        <svg className="absolute inset-0 h-full w-full stroke-gray-900/10" fill="none">
          <defs>
            <pattern
              id="pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9"
              x="0"
              y="0"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
            </pattern>
          </defs>
          <rect
            stroke="none"
            fill="url(#pattern-87beeb02-b726-4cd1-be69-ae5bc27986e9)"
            width="100%"
            height="100%"
          ></rect>
        </svg>
        Contact Details Here
      </div>
    );
  }
}
