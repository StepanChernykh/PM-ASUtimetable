import DOMParser from 'react-native-html-parser'
import values from 'lodash/values'
import pick from 'lodash/pick'
import compact from 'lodash/compact'
import { Faculty } from 'Types/faculty'

export default function parseFaculty(html: string): Array<Faculty> {
  const parser = new DOMParser.DOMParser();
  const parsed = parser.parseFromString(html, 'text/html');
  const tags = parsed.getElementsByAttribute('class', 'link_ptr_left margin_bottom')

  const arr = values(tags)
  const urls = compact(arr.map(
        (tag: any) => pick(values(values(pick(values(tag.childNodes)[0], ['attributes']))[0])[0], 'nodeValue').nodeValue
    ))
  const names = compact(arr.map((tag: any) => values(pick(values(tag.childNodes)[0], ['childNodes']).childNodes)[0]))
      .map((tag: any) => pick(tag, 'data').data)

  return names.map((name: string, index: number) => ({
      name,
      url: urls[index],
  }))
}
