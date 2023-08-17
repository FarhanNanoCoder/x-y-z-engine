import React from 'react'
import SearchPanelRecord from './SearchPanel-Record'
import ListViewRecord from './ListView-Record'
import { handleSortQuery } from "@helpers/util";
import { useRouter } from 'next/router';

const Record = ({base="/record"}) => {
  const router = useRouter()
  return (
    <div>
      <SearchPanelRecord/>
      <ListViewRecord
        onItemActionSelect={() => {}}
        onUpdateSortQuery={({ sort_by }) =>
          handleSortQuery({ sort_by, router: router, base: base })
        }
      />
    </div>
  )
}

export default Record