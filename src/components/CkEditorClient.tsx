'use client'
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface Props {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
	className?: string;
}

const CkEditorClient: React.FC<Props> = ({ value, onChange, placeholder, className = '' }) => {
	return (
		<div className={className}>
			<CKEditor
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				editor={ClassicEditor as unknown as any}
				data={value}
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				onChange={(_, editor: any) => onChange(editor.getData())}
				config={{
					placeholder,
					toolbar: [
						'heading', '|',
						'bold', 'italic', 'underline', 'link', '|',
						'bulletedList', 'numberedList', 'blockQuote', '|',
						'undo', 'redo'
					],
				}}
			/>
		</div>
	);
};

export default CkEditorClient;
