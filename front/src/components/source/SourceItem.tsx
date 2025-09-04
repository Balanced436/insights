import Source from '../../models/source.ts';
import { Stack, Typography } from '@mui/material';
import React from 'react';

/**
 * A basic component that display source information
 * @param source
 * @constructor
 */
export function SourceItem({ source }: { source: Source }): React.ReactElement {
	return (
		<Stack>
			<Typography>Source id : {source.id}</Typography>
			<Typography>Title : {source.title}</Typography>
			<Typography>Description : {source.description}</Typography>
			<Typography>VideoUrl : {source.videoUrl}</Typography>
			<Typography>AudioUrl : {source.audioUrl}</Typography>
			<Typography>Date de création : {source.createdAt.toLocaleString('fr-FR')}</Typography>
			<Typography>Date de mise à jour : {source.updatedAt.toLocaleString('fr-FR')}</Typography>
			<Typography>Corpus : {source.corpusID}</Typography>
		</Stack>
	);
}
