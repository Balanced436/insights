import Source from "../../models/source.ts";
import {Stack} from '@mui/material' ;
import React from "react";
export function SourceInfos({source} : { source : Source }): React.ReactElement {
    return <Stack>
        <span>Source id : {source.id}</span>
        <span>Title : {source.title}</span>
        <span>Description : {source.description}</span>
        <span>VideoUrl : {source.videoUrl}</span>
        <span>AudioUrl : {source.audioUrl}</span>
        <span>Date de création : {source.createdAt.toLocaleString('fr-FR')}</span>
        <span>Date de mise à jour : {source.updatedAt.toLocaleString('fr-FR')}</span>
        <span>Corpus : {source.corpusID}</span>
    </Stack>

}