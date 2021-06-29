import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useTranslation } from 'react-i18next';
import semver from 'semver';
import _ from 'underscore';
import { Channel, Instance } from '../../api/apiDataTypes';
import { cleanSemverVersion } from '../../utils/helpers';
import Item from './Item';

function Table(props: {
  version_breakdown?: any;
  channel: Channel;
  instances: Instance[];
}) {
  const [selectedInstance, setSelectedInstance] = React.useState<string | null>(null);
  const { t } = useTranslation();
  const versions = props.version_breakdown || [];
  const lastVersionChannel =
    props.channel && props.channel.package ? cleanSemverVersion(props.channel.package.version) : '';
  const versionNumbers = _.map(versions, version => {
    return cleanSemverVersion(version.version);
  }).sort(semver.rcompare);

  function onItemToggle(id: string | null) {
    if (selectedInstance !== id) {
      setSelectedInstance(id);
    } else {
      setSelectedInstance(null);
    }
  }

  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          <TableCell>{t('instances|Instance')}</TableCell>
          <TableCell>{t('instances|IP')}</TableCell>
          <TableCell>{t('instances|Current Status')}</TableCell>
          <TableCell>{t('instances|Version')}</TableCell>
          <TableCell>{t('instances|Last Check')}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.instances.map((instance, i) => (
          <Item
            key={'instance_' + i}
            instance={instance}
            lastVersionChannel={lastVersionChannel}
            versionNumbers={versionNumbers}
            selected={selectedInstance === instance.id}
            onToggle={onItemToggle}
          />
        ))}
      </TableBody>
    </MuiTable>
  );
}

export default Table;
